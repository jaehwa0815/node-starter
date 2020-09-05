const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

//config
const config = require('./config/key');

// model
const {User} = require("./models/User");
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookieParser());

// db연결
const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false 
})
.then(() => console.log('MongoDB Connected.....'))
.catch(err => console.log(err))

// Router
app.get('/api/users',(req, res)=> res.send('hello jaehwa'))

app.post('/api/users/register', (req, res)=> {
    //회원 가입 할때 필요한 정보를 client에서 가져오면
    //그것드을  디비에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.status(400).send(err)

        return res.status(200).json({
            success:true,
            userInfo
        })
    })
})

app.post('/api/users/login', (req, res)=>{
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess : false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }
        //이멜이 디비에 있다면, 입력 비밀번호 체크
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            console.log(isMatch)
            if(!isMatch) 
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 일치하지 않습니다."
                    })
            //비밀번호가 같으면 토큰 생성
            userInfo.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장, 어디에? 쿠키. 로컬스토리지, 세션
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess : true, 
                    userId: user._id
                })
            })
        })
    })
})

app.get('/api/users/auth', auth , (req, res) => {
    // 여기까지 미들웨이를 통과했다는 건 인증이 투루다
    res.status(200).json({
        _id: req.user.id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""}
        ,(err, user)=>{
            if(err) return res.json({success:false, err})
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, ()=> console.log(`yoyoyo jaehwa ${port}`))