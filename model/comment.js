

const mongoose = require("mongoose")
const Schema = mongoose.Schema

let commentSchema = new Schema({
   content:{type:String,required:true},
   author:{type:Schema.Types.ObjectId,ref:"user"},
   article:{type:Schema.Types.ObjectId,ref:"artucle"},
   date:{type:Date,default:Date.now()}
})


module.exports = mongoose.model("comment",commentSchema)