const express = require("express"),
      mongoose = require("mongoose"),
      session = require("express-session"),
      mongooseSession = require("connect-mongo")(session)
//  启动数据库
mongoose
      .connect("mongodb://localhost:27017/blog",{useNewUrlParser:true})
      .then(()=>{console.log("数据库连接成功")})
      .catch(()=>{console.log("数据库连接失败")})
//  创建app
let app = express();
//  监听端口
app.listen(9527);
//  设置session参数
app.use(session({
   secret:"nicai", //密钥，值随便填写
   rolling:true ,//只要用户和后端有交互（访问页面，跳转页面，ajax……），刷新存储时间
   resave:false ,//是否每次请求都重新存储session数据
   saveUninitialized:false ,//初始值
   cookie:{maxAge:1000*60*10}, // 设置session过期时间
   store : new mongooseSession({
      url : "mongodb://localhost:27017/blog"
   })//不设置store是服务器内存中存储session信息，我们可以通过设置store讲session数据存到数据库

}))

//  默认中间件
app.use(express.json());
//在处理POST请求的时候，我们需要使用中间件将客户端传过来的数据格式化一下
app.use(express.urlencoded({extended:true}));
//开放静态资源库
app.use(express.static("./public"));
// 设置模板
app.set("view engine","ejs");
// 监听根路由
app.get("/",(req,res)=>{
   res.render("blog")
})
// //  注册账号路由
// app.get("/register",(req,res)=>{
//    res.render("register")
// })
app.post("/register",require("./routers/register"))
// // 登录路由
// app.get("/signin",(req,res)=>{
//    res.render("signin")
// })
app.post("/signin",require("./routers/signin"))
//  用户中心路由
app.get("/usercenter",require("./routers/usercenter"))
//  用于检测用户是否登录的路由
app.post("/usercenter",(req,res)=>{
   if (req.session.userInfo) {
      res.send({login:true})
   }else{
      res.send({login:false})
   }
})
//  退出登录 路由
app.get("/signout",(req,res)=>{
   //  清除session
   req.session.destroy();
   //  退出后重定向到首页
   res.redirect("/")
})
//个人中心信息更改路由
app.post("/update",require("./routers/update"))
//  密码修改路由
app.post("/resetpwd",require("./routers/resetpwd"))
// 文章发表路由  //  文章查看路由
app.use("/article",require("./routers/article"))
// 文章查找路由
app.post("/search",require("./routers/search"))
// 文章删除路由
app.post("/delete",require("./routers/delete"))
//评论与删除评论路由
app.use("/comment",require("./routers/comment"))
//  上传路由
app.use("/upload",require("./routers/upload"))
//  管理员路由
app.use("/admin",require("./routers/admin"))
