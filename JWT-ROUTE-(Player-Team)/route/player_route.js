var express = require('express')
var app = express();
var route = express.Router();
var Player = require('../schema/Player');
var Team = require('../schema/Team');
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

// Post create player
route.post('/create', (request, response) => {
    var body = request.body;
    var player_detail = new Player(body);
    player_detail.created_by = user_id;
    player_detail.save().then((data) => {
        response.status(200).send("Player created success!!: " + data)
    }).catch((error) => {
        response.send(error)
    });

})

// GET list player
route.get('/list', (request, response) => {
    Player.find().then((data) => {
        if (data.length == 0)
            return response.send("No Player Found");
        return response.send(data);
    }).catch((error) => {
        response.send(error)
    });
})

// GET particular player
route.get('/:id', (request, response) => {
    var id = request.params.id;
    Player.find({ _id: id }).then((data) => {
        if (data.length == 0)
            return response.send("No Player Found");
        return response.send(data);
    }).catch((error) => {
        response.send(error)
    });
})

// Put particular player
route.put('/:id', (request, response, next) => {
    if (role == "team") {
        Player.find({ created_by: user_id }).then((data) => {
            if (data.length == 0)
                return response.send("This player is not in your team");
            return next();
        }).catch((error) => {
            response.send(error)
        });
    } else if (role == "admin")
        return next();
    return response.status(403).send("Not authorized");
}, (request, response) => {
    var id = request.params.id;
    var body = request.body;
    Player.findByIdAndUpdate({ _id: id }, body).then((data) => {
        return response.send("Player detail updated success!!: " + data);
    }).catch((error) => {
        response.send(error)
    });
})

// Delete particular player
route.delete('/:id', (request, response, next) => {
    if (role == "team") {
        Player.find({ created_by: user_id }).then((data) => {
            if (data.length == 0)
                return response.send("This player is not in your team");
            return next();
        }).catch((error) => {
            response.send(error)
        });
    } else if (role == "admin")
        return next();
    return response.status(403).send("Not authorized");
}, (request, response) => {
    var player_id = request.params.id;
    Player.findByIdAndRemove({ _id: player_id }).then((data) => {
        response.send("player removed success");
    }).catch((error) => {
        response.send(error)
    });
})



module.exports = route;