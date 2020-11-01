// 业务逻辑模块


const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginIn = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let sql = `select * from users where username = "${username}"`
    db.base(sql, (err, result) => {
        if (err) throw err;
        var user = result[0];
        if (result.length = 0) {
            res.json({
                message: "用户不存在，请先注册",
                resultCode: 0

            })
        } else {
            // 密码验证 bcrypt.compare(前端传递的密码, 数据库获取到的密码, function(err, result)
            // 第三个参数回调函数可以用promise代替
            // bcrypt.compare(password, user.password).then(isMatch => {
            //     if (isMatch) {
            //         res.json("success")
            //     } else {
            //         res.json("false");
            //     }
            // })
            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (result) {
                    // 成功之后生成token，返回token
                    // res.json({
                    //     message: '登录成功',
                    //     resultCode: 1
                    // })
                    const rule = { id: user.id, username: user.username ,email:user.email,identity:user.identity};
                    // jwt.sign(令牌（需要的token信息）,"secret",token有效时间回调函数(err,token)
                    jwt.sign(rule, "secret", { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            message: '登录成功',
                            resultCode: 1,
                            token: 'Bearer ' + token
                        });
                    })
                } else {
                    res.json({
                        message: '登录失败，密码错误',
                        resultCode: 0
                    })
                }
            });
        }
    })
}
exports.register = (req, res) => {
    var username = req.body.username;
    let sql = `select * from users where username = "${username}"`;
    db.base(sql, (err, result) => {
        if (err) throw err;
        // 用户已经存在存在
        if (result.length > 0) {
            res.json({
                message: '用户已经存在，请直接登录',
                resultCode: 1
            })
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) throw err;
                    req.body.password = hash;
                    // res.send(req.body);
                    // console.log(req);
                    let sql = 'insert into users set?'
                    let info = req.body;
                    db.base(sql, info, (result) => {
                        if (result.affectedRows == 1) {
                            res.json({
                                flag: 1,
                                message: '注册成功!'
                            })
                        } else {
                            res.json({
                                flag: 2,
                                message: "注册失败!"
                            })
                        }
                    })

                })
            })
        }
    })

}


// Private,只有验证了token的user才能获取当前信息
exports.current = (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
}

exports.test = (req, res) => {
    // console.log(req);
    let identity = req.user.identity;
    if (identity == 'manager') {
        res.json({
            body: req.body,
            user: req.user
        })
    } else {
        res.json('您没有权限！')
    }

}

exports.addProfile = (req, res) => {
    let identity = req.user.identity;
    if (identity == 'manager') {
        let sql = 'insert into profile set?'
        let data = req.body;
        data.date = new Date();
        db.base(sql, data, (result) => {
            // res.json(result);
            if (result.affectedRows == 1) {
                // let d = new Date();
                // let time = d.getFullYear() +"-"+d.getMonth()+1+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
                res.json({
                    message: '添加成功！',
                    resCode: 1,
                })
            } else {
                res.json({
                    message: '添加失败！',
                    resCode: 2
                })
            }
        })
    } else {
        res.json({
            message: '您没有权限，请联系管理员！',
            resCode: 0
        })
    }
}

exports.editProfile = (req, res) => {
    let identity = req.user.identity;
    let id = req.params.id
    if (identity == 'manager') {
        let sql = `update profile set type="${req.body.type}", descript="${req.body.descript}",income="${req.body.income}",expend="${req.body.expend}",cash="${req.body.cash}",remark="${req.body.remark}",date="${req.body.date}" where id="${id}"`
        db.base(sql, (err, result) => {
            if (err) throw err
            if (result.affectedRows == 1) {
                res.json({
                    message: '修改成功',
                    resCode: 1
                })
            } else {
                res.json({
                    message: '修改失败',
                    resCode: 2
                })
            }
        })
    } else {
        res.json({
            message: '您没有权限，请联系管理员',
            resCode: 0
        })
    }
}


exports.delProfile = (req, res) => {
    let identity = req.user.identity;
    let id = req.params.id;
    if (identity == 'manager') {
        let sql = `delete from profile where id="${id}"`;
        db.base(sql,(err,result)=>{
            if(err) throw err;
            if (result.affectedRows == 1) {
                res.json({
                    message:'删除成功',
                    resCode:1
                })
            }else {
                res.json({
                    message:'删除不成功',
                    resCode:2
                })
            }
        })
    } else {
        res.json({
            message: '您没有权限，请联系管理员',
            resultCode: 0
        })
    }
}


exports.searchAll = (req,res)=>{
    let sql = `select * from profile`
    db.base(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
}

exports.searchOne = (req,res)=>{
    let id = req.params.id;
    let sql = `select * from profile where id="${id}"`;
    db.base(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
}

exports.getUserAll = (req,res)=>{
    let sql = 'select * from users';
    db.base(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
}