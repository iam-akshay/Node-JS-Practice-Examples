var express = require('express')
var app = express();
var route = express.Router();
var User = require('../schema/User');
var jwt = require('../helper/jwthelper')

// Post register
route.post('/register', (request, response) => {
    var body = request.body;
    if (body.username || body.password || body.role) {
        User.count({ username: body.username }).then((data) => {
            if (data > 0)
                return response.send("Already have an account");
            var user_detail = new User(body);
            user_detail.save().then((data) => {
                response.status(200).send("You are registered now!!")
            }).catch((error) => {
                response.send(error)
            });
        }).catch((error) => {
            return response.send(error);
        })
    } else {
        response.send("Please fill all the details")
    }
})

// Post login
route.post('/login', (request, response) => {
    var body = request.body;
    if (body.username || body.password) {
        User.find({ username: body.username, password: body.password }).then((data) => {
            if (data.length == 0)
                return response.send("Invalid Credential");
            // Token Generate
            //console.log(data[0]._id);
            var token = jwt.sign({ id: data[0]._id, role: data[0].role }, "AKSHAYJAIN");
            return response.send(token);
        }).catch((error) => {
            response.send(error)
        });
    } else {
        response.send("Please fill all the details")
    }
})

module.exports = route;