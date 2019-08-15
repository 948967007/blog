
const user = require("../model/user")
const crypto = require("crypto")

module.exports = function(req,res){
   //  通过用户名查找
   user.findOne({username:req.body.username})
   .then((data)=>{
      if (data) {
         //  用户存在
         let pwd = crypto.createHash("sha256").update(req.body.password).digest("hex");

            if (pwd === data.password) {
               //res.render("blog")
               //  登录成功之后，标识该用户已经登录
               //req.session.goudan = true;
               //  登录成功后  记录登陆的是谁
               req.session.userInfo = data;
               res.send({code: 1 ,msg:"登录成功"});
            }else{
               res.send({code: 0 ,msg:"密码错误"});
            }
         }else{
            //  用户不存在
            res.send({code: 0 ,msg:"用户名不存在"});
         }

      })
      .catch(()=>{
         res.send({code: 1 ,msg:"服务器异常，请重试"});
      })
   }





   // module.exports = function(req,res){
   //    /* console.log(req.body);
   //    res.send("后端接收到请求") */
   //   user.findOne({username:req.body.username})
   //       .then((data)=>{
            
   //          if (data) {
   //             //  用户存在
   //             let pwd = crypto.createHash("sha256").update(req.body.password).digest("hex");
   //             console.log(pwd);
               
   //             if (pwd === data.body.password) {
   //                //res.render("blog")
   //                res.send({code: 1 ,msg:"登录成功"});
   //             }
   //          }else{
   //             //  用户不存在
   //             res.send({code: 0 ,msg:"用户名不存在"});
   //          }
   //       })
   //    .catch((e)=>{
   //       res.send({code: 1 ,msg:"服务器异常，请重试"});
   //       throw e;
   //    })
      
   // }