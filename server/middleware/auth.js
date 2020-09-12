const {User} = require('../models/User')


let auth = (req, res, next) =>{
    //인증 처리를 하는 곳
    //클라이언트 쿠키에서 토큰을 겟
    let token
    try {
        token = req.cookies.x_auth;
    } catch (error) {
        throw(error);
        
    }
    //토큰을  복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        // 유저가 없으면 인증 노
        if(!user) return res.json({isAuth: false, error: true})
        // 유저가 있으면 인증 오케이
        req.token = token; 
        req.user = user;
        next();
    })
}
module.exports = {auth};