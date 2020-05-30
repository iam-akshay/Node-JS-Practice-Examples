var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:["player","team","admin"]
    }
},{
    collection:"User",
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema);