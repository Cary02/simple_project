const express = require("express");
const server = require('./server');
const router = express.Router();
const passport = require("passport");
const { authenticate, session } = require("passport");

// 登录
router.post('/login',server.loginIn);
// 注册
router.post('/register',server.register);
// 验证token
router.get('/current',passport.authenticate("jwt",{session:false}),server.current);

// test
router.post("/test",passport.authenticate("jwt",{session:false}),server.test);

// 添加profile
router.post("/add",passport.authenticate("jwt",{session:false}),server.addProfile);

// 编辑profile
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),server.editProfile);

// 删除profile

router.post("/delProfile/:id",passport.authenticate("jwt",{session:false}),server.delProfile);

// 查询所有信息

router.get("/searchAll",passport.authenticate("jwt",{session:false}),server.searchAll);

// 查询一条数据

router.get("/searchOne/:id",passport.authenticate("jwt",{session:false}),server.searchOne);

router.get("/getUserAll",passport.authenticate("jwt",{session:false}),server.getUserAll);


module.exports = router;