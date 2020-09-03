const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false 
})
.then(() => console.log('MongoDB Connected.....'))
.catch(err => console.log(err))

// controller
app.get('/',(req, res)=> res.send('hello jaehwa'))

app.post('/register', (req, res)=> {
    //회원 가입 할때 필요한 정보를 client에서 가져오면
    //그것드을  디비에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.status(500).json({ success: false, err})
        return res.status(200).json({
            success:true,
            userInfo
        })
    })
})



app.listen(port, ()=> console.log(`yoyoyo jaehwa ${port}`))