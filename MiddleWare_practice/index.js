express = require('express')
app = express()

app.use(function(request,response,next){
      console.log("Global Middleware called");
    next();
})

// app.get('/',function(request,response){
//     //var totalRecord = request.params.totalRecord;
//     //console.log("hello ---------------------------"+totalRecord);
//     //console.log(Number.isInteger(totalRecord));
//     var totalRecord = request.header("total_record");
//     console.log("hello ---------------------------"+totalRecord);
//     //var regularExpression = /[0-9]/;
//     if(/^[0-9]+$/.test(totalRecord))
//     {
//         response.send("OK");
//     }
//     else
//         response.status(400).send("Bad Request");
// })

app.get('/person/:personId',function(request,response,next){
    if(request.params.personId.length == 3)
    {
        console.log("called if ");
        return next();
    }
    response.status(400).send("Only 3 digits allowed");
},[function(request,response,next){
    console.log("Route handle called 1");
    //response.send(request.params.personId);
    next()
},function(request,response){
    console.log("Route handle called 2");
    response.send(request.params.personId);
}])


// app.get('/:totalRecord',function(request,response){
//     var totalRecord = request.params.totalRecord;
//     var reg = /^[0-9]+$/;
//     if(reg.test(totalRecord))
//     {
//         response.header("total_record",totalRecord).send("OK");
//     }
//     else
//         response.status(400).send("Bad Request");
// })

// app.use(function(request,response,next){
//     //response.header("authorization", "akshayjain1");
//     //response.setHeader("authorization","akshayjain");
//     request.headers.authorization = "akshayjain";
//     console.log("Middleware 1: 1"+request.headers.authorization);
//     if(request.headers.authorization)
//     {
//         response.send("Key available");
//         next();
//     }
//     else
//     {
//         response.status(401);
//         response.send("Key Not available");
//     }
// })

// app.use('/',function(request,response){
//     var contype = request.headers;
//     console.log(contype);
//     response.send(contype);
// })

app.use(function(request,response,next){
    console.log("Middleware 2");
    next();
})

app.listen(3001,function(error){
    if(error)
        console.log("Something went wrong and server is not yet started");
    console.log("Your server has been started sucess at http://localhost:3001");
})

