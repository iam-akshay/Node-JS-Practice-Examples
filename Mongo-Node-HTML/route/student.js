var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();

var Student = require('../student/student');
// Save Data

router.get('/',function(request,response){
    response.sendFile("/Users/lcom2/Desktop/NodeJS/MongoNode/static/index.html")
})
//router.use(express.urlencoded())
router.post('/create',function(request,response){
    var student_obj = new Student(request.body) 
    student_obj.save(function(error,data){
        if(error)
            response.status(400).send("An error has been occure while inserting data");
        response.status(200).send("Success, Record Insert!!");
    })
});


// get Data based on filtering
router.get('/retrive',function(request,response){
    Student.find({},function(error,data){
        if(error)
            return response.status(500).send("Something went wrong")
        return response.status(200).send(data);
    }).where("salary").gte(20000).select(["name","salary"])//.sort({"salary":1}).limit(2);
})


// delete the record

// router.get('/deleteall',function(request,response){
//     Student.deleteMany({}).then(function(data){
//         response.status(200).send(data);
//     }).catch(function(error){
//         response.send(400).send(error);
//     })
// })

router.get('/deleteall',async function(request,response){
    try{
        var deletedRecord =  await Student.remove({})
        return response.status(200).send(deletedRecord);
    }catch(error){
        response.send("An error has been occure",error);
    }
})


module.exports = router;