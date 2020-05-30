var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var PersonSchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            require:true
        },
        age:Number
    },
    {
        collection:"Person",
        timestamps:true
    }
)
module.exports = mongoose.model("Person",PersonSchema);