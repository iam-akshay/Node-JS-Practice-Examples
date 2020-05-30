var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded())
var mongoose = require('mongoose');
// user route
var user = require('./route/user_route');
app.use('/user', user)
// team route
var team = require('./route/team_route');
app.use('/team', team)
// player route
var player = require('./route/player_route');
app.use('/player', player)
mongoose.connect("mongodb://localhost:27017/Cricket", {})
mongoose.connection.on('error', (error) => {
    console.log("Error occure while connecting with Database");
}).once('open', () => {
    console.log("Connection has been established");
})
app.listen(3001);