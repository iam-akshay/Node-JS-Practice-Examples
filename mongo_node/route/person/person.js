var express = require('express')
var chalk = require('chalk')
var app = express()

var router = express.Router();
app.use(router);
var Person = require('../../schema/person')

// Insert record
router.post('/create',function(request,response){
    var obj_person = new Person(request.body);
    obj_person.save().then(item=>{
        response.send("Record Inserted successfully");
    }).catch(error=>{
        response.status(400).send("Unable to save data");
    })
})

// Get all data using mongoDB           http://localhost:3001/person/
router.get('/',function(request,response){
    Person.find({},function(error,data){
        if(error){
            chalk.red("An error occure ",error);
            return response.send(500).send("An error has been occure.");
        }
        response.json(data);
    })
})

// Update all data using mongoDB            
router.patch('/update/:id',function(request,response){
    var id = request.params.id;
    var body = request.body;
    console.log(body);
    Person.findByIdAndUpdate({_id:id},body,function(error,data){
        if(error)
        {
            chalk.red("An error has been occur while retriving data",error);
            return response.status(500).send("An error has been occur while retriving data");
        }
        return response.json(data);
    })
})

// Delete particular data using mongoDB
router.delete('/delete/:id',function(request,response){
    var id = request.params.id;
    Person.findByIdAndDelete(id,function(error,data){
        if(error){
            chalk.red("An error occure while deleting the record",error);
            return response.send("An error occure while deleting the record");
        }
        return response.json(data);
    })
})

module.exports = router;
