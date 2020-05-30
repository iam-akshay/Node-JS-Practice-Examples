var express = require('express');
var chalk = require('chalk');
var app = express();
app.use(express.json());
var jwt = require('./helper/jwtHelper');

console.log(chalk.yellow(jwt.sign("SomeSecret")));

app.use(async function (request, response,next) {
    if (request.headers.authorization) {
        var decodedData = await jwt.verify(request.headers.authorization, "SomeSecret");
        return response.json(decodedData);
    }
    console.log(chalk.yellow("Decoded data not found"));
    return response.send('Please pass the required token');
})
app.get("/", function (request, response) {
    response.send("Display data");
});

app.listen(3001, function (error) {
    if (error) {
        console.log("Error occure while starting node application", error);
    }
    console.log("Node application successfully startd on http://localhost:3001");

});