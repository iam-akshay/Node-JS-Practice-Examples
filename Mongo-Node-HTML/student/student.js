var mongoose = require('mongoose')
var Schema = mongoose.Schema
var StudentSchema = new Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    contact:{
        type:Number,
        trim:true,
        require:true
    },
    email:{
        type:String,
        trim:true
    },
    gender:{
        type:Boolean
    },
    hobbies:{
        type:Array
    },salary:{
        type:Number,
    }
},{
    collection:'Student',timestamps:true
})
module.exports = mongoose.model('Student',StudentSchema);