const mongoose = require("mongoose");
const Schema = mongoose.Schema
//const crypto = require('crypto');
const crypto = require("crypto")
//  建立Schema
let userSchema = new Schema({
   username:{
      type:String,
      required:true,
      match:/^[\d_@a-zA-Z\.]{6,12}$/
   },
   password:{
      type:String,
      required:true,
      match:/^[\d_@!#$%^&*()\[\]{}+a-zA-Z\.]{6,18}$/
   },
   date:{type:Date,default:Date.now()},
   userInfo:{
      sex:{
         type:String,
         enum:["男","女"]
      },
      age:Number,
      email:{
         type:String,
         match:/^[\da-z_]+@[\da-z]+(\.[a-z]+)+$/
      },
      tel:{
         type:String,
         match:/^1[3456789]\d{9}$/
      },
      status:{
         type:String,
         default:"这个人很懒~！没有签名。"
      },
      photo:{
         type:String,
         default:"default.jpg"
      }

   }
})
//  密码加密
userSchema.pre("save",function(next){
   //const hash = crypto.createHash('sha256');
   const hash = crypto.createHash("sha256").update(this.password).digest("hex");
   this.password = hash;

   next()
})

//  建表
module.exports = mongoose.model("user",userSchema);