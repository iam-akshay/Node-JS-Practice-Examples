var express = require('express');
var app = express();
var router = express.Router();
var Student = require('./route/student');
app.use(router)
app.use(express.json())
app.use(express.urlencoded())
app.use('/student',Student)
var chalk = require('chalk');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/testdemosystem",{})
mongoose.connection.on('error',function(error){
    if(error){
        chalk.red("An error has been occure");
    }
}).once('open',function(){
    
    console.log(chalk.green("mongo server has been started"));
})
app.listen(3001);