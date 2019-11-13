const Koa = require('koa');
var router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const crypto  = require("crypto")
const axios = require('axios');


//验证码
const svgCaptcha = require('svg-captcha')
//使用session保存验证码
const session = require('koa-session');

const app = new Koa();

//文件上传需要使用的依赖
const fs = require('fs');
const multer = require('koa-multer');
const path = require('path')
const upload = multer({ dest: 'uploads/' });  //文件存放的路径

const staticFiles = require('koa-static')
// console.log(staticFiles)
app.use(staticFiles(path.join(__dirname + '/uploads')))
// const names = path.join(__dirname + '/uploads');
// console.log(names)


//jwt token管理
const jwt = require('jsonwebtoken');
const SECRET = 'CatWatermelon'
app.use(bodyParser());


const Location = require("./src/model/location").Location;
const User = require("./src/model/user").User2;

app.keys = ['some secret hurr'];

//koa-session 的配置项
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));




app.use(router.routes());


router.post('/profile', upload.single('location'), async (ctx)=>{
    var newName = ctx.req.file.path + path.parse(ctx.req.file.originalname).ext;
    // console.log(ctx.req.file);
    // console.log(newName);
    var result = false;
    await fs.rename(ctx.req.file.path, newName, function (err) {
        !err &&  (result = true);
    })
    return ctx.body = result;
})


router.get('/getCaptcha', async(ctx)=>{
    const cap = svgCaptcha.create({
        size: 4, // 验证码长度
        width:100,
        height: 50,
        fontSize: 46,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: false, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee' // 验证码图片背景颜色
    })
      
    let img = cap.data // 验证码
    let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
    ctx.session.captcha = text;
    // console.log(ctx.session.captcha);
    return ctx.body = {
        img: `${img}`,
        text: text
    }
})

router.post('/mobileCaptcha', async(ctx)=>{
    var { accountNumber } = ctx.request.body;
    // console.log(accountNumber)
    var pwd = "", result = false;
    for(var idx = 0; idx < 6; idx ++){
        var seed = parseInt(Math.random() * 9);
        pwd = pwd + seed;
    }
    await axios.get(`http://v.juhe.cn/sms/send?mobile=${accountNumber}&tpl_id=186500&tpl_value=%23code%23%3D${pwd}&key=8ff0d9f7b2bf6b8437de21e027ed552c`).then(res=>{
        console.log(res);
        if(res.data.reason == '操作成功' && res.data.error_code == 0) {
            ctx.session.mobileCaptcha = pwd;
            result = true;
        }
    })
    return ctx.body = result ? {
        status: 1,
        data: pwd
    } : {
        status: 0,
        data: 0
    };
})

router.post('/register', async(ctx)=>{
    var {accountNumber, password, mobileCaptcha } = ctx.request.body,
    status = false;
    if(mobileCaptcha != ctx.session.mobileCaptcha) {
        return ctx.body = {
            status: 0,
            data: null
        }
    }

    await User.findOne({
        where: {
            username: accountNumber
        }
    }).then(res=>{
        if(!res){   //如果不存在说明还没有注册过
           status = false;
        }
        status = !res ? false : true;
    })
    if(!status){
        const result = await User.create({
            username: accountNumber,
            password
        })
        return ctx.body = {
            status: 1,
            data: result
        };
    }
   
    return ctx.body = {
        status: 0,
        data: null
    };
})

router.post('/login', async(ctx)=>{
    var {accountNumber, password, captcha} = ctx.request.body;
    if(captcha.toLowerCase() != ctx.session.captcha)
        return ctx.body = {
            status: 3,
            data: null
        }
    let md5 = crypto.createHash('md5');
    let PSW = md5.update(password).digest('hex');

    await User.findOne({
        where: {
            username: accountNumber,
            password: PSW
        }
    }).then(res=>{
        if(res){
        const token = jwt.sign({
                accountNumber,
                password
            }, 
            SECRET,
            {expiresIn: '1h'}//过期时间为一天
        );
        return ctx.body = {
            status: 1,
            data: token
        }
    } 
        return ctx.body = {
            status: 0,
            data: null
        };
    })
})

router.get('/userInfo',async (ctx)=>{
    const token = ctx.request.header['authorization'];
    if(!token) {
        return ctx.body = {
            status: 0,
            data: null
        }
    }

    let userinfo = jwt.decode(token.split(' ')[1], SECRET);
    // console.log(userinfo, userinfo.accountNumber, userinfo.password)
    let md5 = crypto.createHash('md5');
    let PSW = md5.update(userinfo.password).digest('hex');
    //根据解析到的token向数据库进行请求数据
    const result = await User.findOne({
        where: {
            username: userinfo.accountNumber,
            password: PSW
        }
    }).then(res=>{
        if(res){
            return ctx.body = {
                status: 1,
                data: res
            }
        }
        return ctx.body = {
            status: 0,
            data: null
        }
    })
})


router.get('/location',async (ctx)=>{
    await Location.findAll().then(res=>{
        // console.log(res);
        return ctx.body = res;
    })
})

// router.get('/getToken', async(ctx)=>{
//     axios.get('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=3zsSffY5Spfjcn8bbZfzrMxR&client_secret=LbSz1dVHV8HFutnIM1NpL57sgy0hNIL0')
//     .then(res=>{
//         console.log(res.data.access_token);
//     })
// })

app.use(router.routes());

app.listen(3000);

console.log('server run successed in localhost:3000');