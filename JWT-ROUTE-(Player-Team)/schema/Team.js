var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    logo:{
        type:String,
        trim:true
    },
    tag_line:{
        type:String,
        trim:true
    },
    created_by:{
        type:String,
        required:true,
        trim:true
    }
},{
    collection:"Team",
    timestamps:true
})

module.exports = mongoose.model("Team",TeamSchema);