var express = require('express');
app = express();
var mongoose = require('mongoose');
var Person = require('./route/person/person');
app.use(express.json())
app.use('/person',Person);

//app.use('/person',Person);
mongoose.connect("mongodb://localhost:27017/testdemosystem",{})
mongoose.connection.on('error',function(error){
    if(error){
        console.log("An error has been occur."+error);
        process.exit(1);
    }
}).once('open',function(){
    console.log("mongoDB server has been started.");
})
app.listen(3001)