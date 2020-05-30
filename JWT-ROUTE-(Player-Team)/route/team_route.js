var express = require('express')
var app = express();
var route = express.Router();
var Team = require('../schema/Team');
var Player = require('../schema/Player');
var jwt = require('../helper/jwthelper')

var user_id = "";
var role = "";
route.use((request, response, next) => {
    var authorisation = request.headers.authorization;
    if (authorisation) {
        var decodedData = jwt.verify(authorisation, "AKSHAYJAIN");
        if (decodedData.error)
            return response.send("Invalid token");
        user_id = decodedData.data.id;
        role = decodedData.data.role;
        //var currentRequest = request.method;
        next();
    } else {
        return response.send("Please Enter Token");
    }
})


// Post create team
route.post('/create', (request, response, next) => {
    if (role == "admin" || role == "team")
        next();
    else
        return response.status(403).send("Unauthorized");
}, (request, response) => {
    var body = request.body;
    Team.count({ created_by: user_id }).then((data) => {
        if (data > 0)
            return response.send("Not allow, You already have 1 team.");
        var team_detail = new Team(body);
        team_detail.created_by = user_id;
        team_detail.save().then((data) => {
            return response.status(200).send("Team created success!!: " + data)
        }).catch((error) => {
            return response.send(error)
        });
    }).catch((error) => {
        return response.send(error);
    })
})

// GET list team
route.get('/list', (request, response) => {
    Team.find().then((data) => {
        if (data.length == 0)
            return response.send("No Team Found");
        return response.send(data);
    }).catch((error) => {
        response.send(error)
    });
})

// GET particular team
route.get('/:id', (request, response) => {
    var id = request.params.id;
    Team.find({ _id: id }).then((data) => {
        if (data.length == 0)
            return response.send("No Team Found");
        return response.send(data);
    }).catch((error) => {
        response.send(error)
    });
})

// Put particular team
route.put('/:id', (request, response, next) => {
    var id = request.params.id;
    if (role == "team") {
        Team.find({ created_by: user_id, _id: id }).then((data) => {
            if (data.length == 0)
                return response.send("No team created by you");
            return next();
        }).catch((error) => {
            return response.send(error)
        });
    } else if (role == "admin")
        return next();
    else
        return response.status(403).send("Not authorized");
}, (request, response) => {
    var id = request.params.id;
    var body = request.body;
    Team.findByIdAndUpdate({ _id: id }, body).then((data) => {
        return response.send(data);
    }).catch((error) => {
        return response.send(error)
    });
})

// Delete particular team
route.delete('/:id', (request, response, next) => {
    console.log(role);
    if (role == "team" || role == "admin") {
        Team.find({ created_by: user_id }).then((data) => {
            console.log(data.length);
            if (data.length == 0)
                return response.send("No team created by you");
            return next();
        }).catch((error) => {
            return response.send(error)
        });
    } else if (role == "admin")
        return next();
    else
        return response.status(403).send("Not authorized");
}, (request, response) => {
    var id = request.params.id;
    console.log(id);
    Player.findOneAndRemove({ team_id: id }).then((data) => {
        console.log(data);
    }).catch((error) => {
        return response.send(error)
    });
    Team.findByIdAndRemove({ _id: id }).then((data) => {
        console.log(data);
        return response.send("Team and its player were removed");
    }).catch((error) => {
        return response.send(error)
    });
})

module.exports = route;



// Team.findByIdAndRemove({ _id: id }).then((data) => {
//     console.log(data);
//     return response.send("Team and its player were removed");
// }).catch((error) => {
//     return response.send(error)
// });