express = require("express")
app = express()

// Route HTML file
app.use(express.urlencoded())
app.get('/',function(request,response){
    response.sendFile(__dirname+"/index.html");
})

// Save data using post method
app.post('/save_data',function(request,response){
    var name = request.body.txtname;
    var age = request.body.txtage;
    response.send("Name: "+name+"<br/>Age: "+age);
})

// Web server
app.listen(3001,function(error){
    if(error)
        console.log("Something went wrong plases contact admin");
    console.log("Your server has been started at http://localhost:3001");
})