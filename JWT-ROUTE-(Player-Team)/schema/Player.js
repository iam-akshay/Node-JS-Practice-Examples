var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlayerSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    team_id:{
        type:String,
        trim:true
    },
    skill:{
        type:String,
        enum :["Bowler", "Batsman", "WicketKeeper","AllRounder"]
    },
    created_by:{
        type:String,
        required:true,
        trim:true
    }
},{
    collection:"Player",
    timestamps:true
})

module.exports = mongoose.model("Player",PlayerSchema);