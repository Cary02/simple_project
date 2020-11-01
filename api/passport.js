// const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require("./db");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport => {
    // let sql = `select * from users`
    // db.base(sql, (err, result) => {
        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            const username = jwt_payload.username;
            let sql = `select * from users where username = "${username}"`
            db.base(sql,(err,result)=>{
                const user = result[0];
                if(err){
                    return done(err,false);
                }
                if(result.length>0) {
                    return done(null,user)
                }else {
                    return done(null,false);
                }
            })
        }));
    // })


}