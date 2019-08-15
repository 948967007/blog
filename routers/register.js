const user = require("../model/user")
module.exports = function(req,res){
   user.findOne({username:req.body.username})
      .then(data=>{
         if (data) {
            res.send({code: 0 ,msg:"用户名已存在"});
         }else{
            if (req.body.passwore !== req.body.passwore2){
               res.send({code: 0 , msg:"密码不一致"});
            }else{
               user.create(req.body)
                  .then((data)=>{
                     req.session.userInfo = data;
                     res.send({code: 1 , msg:"注册成功"});
                  })
                  .catch(()=>{
                     res.send({code: 0 ,msg:"服务器异常，请重试~"});
                  })
               }
            }
      })
      .catch(()=>{
         res.send({code: 1 ,msg:"服务器异常，请重试"});
         throw e;
      })



}