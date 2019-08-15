(function(){
//选项卡 依赖 element 模块，否则无法进行功能性操作
   layui.use('element', function(){});
//  表单的依赖
layui.use("form",function(){
   var form = layui.form
   var $ = layui.$
   // 验证
   form.verify({
      username:function(value){
         if (!/^[\d_@a-zA-Z]{6,12}$/.test(value)) return "用户名格式不正确"
         
      },
      password:function(value){
         if (!/^[\d_@!#$%^&*()\[\]{}+a-zA-Z\.]{6,18}$/.test(value)) return "密码格式不正确";
      },
      password2:function(value){
         let val = $("#reg-password").val();
         if (value !== val) return "两次密码不一致"
      }
   })
    //  注册提交监听
   form.on('submit(reg)',function(data){
         // console.log(data.field);
         //  layer.open(JSON.stringify(data.field));
      $.ajax({
         method:"POST",
         url:"/register",
         data:data.field,
         success:function(txt){
            //console.log(msg)
            //layer.msg(txt.msg);
            layer.msg(txt.msg,{
               time: 1000
            },function(){
               if (txt.code === 1) {
                  location.href = "/usercenter";
               }
            });
         }
      })
      return false
   });
   //  登录提交监听
   form.on('submit(signin)',function(data){
         // console.log(data.field);
         //  layer.open(JSON.stringify(data.field));
      $.ajax({
         method:"POST",
         url:"/signin",
         data:data.field,
         success:function(txt){
            //console.log(msg)
            layer.msg(txt.msg,{
               time: 1000
            },function(){
               if (txt.code === 1) {
                  location.href = "/usercenter";
               }
            });
         }
      })
      return false
   })
});
//   layui.use("form",function(){
//    var form = layui.form
//    var $ = layui.$
//    // 验证
//    /* form.verify({
//       username:function(value){
//          if (!/^[\d_@a-zA-Z\.]{6,12}$/.test(value)) return "用户名格式不正确";
         
//       },
//       password:function(value){
//          if (!/^[\d_@!#$%^&*()\[\]{}+a-zA-Z\.]{6,18}$/.test(value)) return "密码格式不正确";
//       }
//    }) */


//    //  监听提交
// form.on('submit(demo1)',function(data){
//       // console.log(data.field);
//       //  layer.open(JSON.stringify(data.field));

//       $.ajax({
//          method:"POST",
//          url:"/signin",
//          data:data.field,
//          success:function(txt){
//             //console.log(msg)
//             layer.msg(txt.msg,{
//                time: 1000
//             },function(){
//                if (txt.code === 1) {
//                   location.href = "/usercenter";
//                }
//             });
//          }
//       })
//       return false
      
//    })
// });
})();