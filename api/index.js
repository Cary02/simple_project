const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('passport');

// 初始化passport
app.use(passport.initialize());
require("./passport")(passport);
// 处理参数中间件 post请求
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/home',(req,res)=>{
//     res.send("hello word!!! my name is cary02");
// })
// app.post('/register',(req,res)=>{
// console.log(req.body);
// res.send(req.body);
// })
// 处理跨域问题

app.use(cors());
app.use(router);

app.listen(9000,()=>{
    console.log("server is running!!")
})