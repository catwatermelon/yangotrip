<template>
    <div class="login">
        <div class="logoWrapper">
            <img src="../assets/loginBg4.png" alt="">
            
            <p class="quoto">Yango Guide Service</p>
            <p class="quoto">为阳光而生</p>
        </div>
        <div class="formContainer">
            <form action="">
                <div class="form-group">
                    <input v-model="accountNumber" type="text" name="username" id="username" placeholder="请输入账号">
                </div>
                <div class="form-group">
                    <input v-model="password" type="password" name="password" id="password" placeholder="请输入密码">
                </div>
                <div class="form-group" style="height: 3.215rem">
                    <div class="captchaText" v-html="captchaImgHtml" @click="getCaptcha"></div>
                    <input v-model="inputCaptcha" class="captchaIpt" type="text" name="" id="" placeholder="请输入4位验证码">
                </div>
                <div class="form-group">
                    <button id="login" @click.prevent="login">登录</button>
                </div>
                
            </form>
            <div class="registerWrapper">
                <router-link :to="{name: 'Register'}">新用户注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile'
export default {
    name: 'login',
    data(){
        return {
            accountNumber: '',
            password: '',
            captchaImgHtml: '',
            captchaImgText: '',
            inputCaptcha: '' //用户输入的验证码
        }
    },
    methods: {
        login(){
            if(!(/^1[3456789]\d{9}$/.test(this.accountNumber))){ 
                Toast.failed("请填写正确的手机号码!");
                return; 
            } 
            if(!this.password)
                return;
            if(!this.inputCaptcha) {
                Toast.failed("请输入验证码！");
                return;
            }
            this.$axios.post('/api/login',{
                accountNumber: this.accountNumber,
                password: this.password,
                captcha: this.inputCaptcha
            }).then(res=>{
                const status = res.data.status;
                if(status == 1){
                    Toast.succeed('登陆成功！')
                    localStorage.setItem('token', res.data.data);
                    this.getUserInfo();
                    this.$router.push({name: 'Home'});
                } else if(status == 0)
                    Toast.failed("账号或密码错误！");
                else {
                    Toast.failed("验证码错误！");
                    this.getCaptcha();
                }
            })
        },
        getUserInfo(token){
            this.$axios.get('/api/userInfo').then(res=>{
                if(res.data.status) {
                    const userinfo = res.data.data;
                    // console.log(userinfo)
                    //将通过token请求的用户信息存到vuex中
                    userinfo && this.$store.dispatch('user/LOGIN',{
                        username: userinfo.username,
                        password: userinfo.password
                    })
                    // console.log(this.$store.state.user.isLogin)
                }
            })
        },
        getCaptcha(){
            //请求验证码
            this.$axios.get('/api/getCaptcha').then(res=>{
                this.captchaImgHtml = res.data.img;
                this.captchaImgText = res.data.text;
            })
        }
    },
    // created(){
    //     this.$axios.get('http://v.juhe.cn/sms/send?mobile=13328376988&tpl_id=186500&tpl_value=%23code%23%3D654654&key=8ff0d9f7b2bf6b8437de21e027ed552c').then(res=>{
    //         console.log(res);
    //     })
    // }
    created(){
        this.getCaptcha();
    }
}
</script>

<style>
.login {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content:  center; */
    align-items: center;
    box-sizing: border-box;
    position: relative;
}

.login .formContainer {
    padding-top: 18.2rem;
    width: 90%;
}
.login form {
    width: 100%;
}

.login form .form-group {
    display: flex;
    width: 100%;
    height: 3.125rem;
    margin-bottom: 1.25rem;
}

.login #username, .login #password {
    width: 100%;
    height: 100%;
    font-size: 1.125rem;
    text-indent: 1rem;
    border: none;
    border-bottom: 1px solid rgba(58, 58, 58,.4);
    outline: none;
    background-color: transparent;
    border-radius: 5px;
}

#login {
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #3487ff;
    border: none;
    color: white;
}

.login .registerWrapper {
    width: 100%;
}

.login .registerWrapper a {
    /* text-decoration: none; */
    float: right;
    color: #3487ff;
    font-size: 1rem;
}

.login .logoWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    position: absolute;
    top: 2rem;
}
.login .logoWrapper img {
    height: 12.7rem; 
    font-size: 0; 
}
.login .quoto {
    letter-spacing: .18rem;
}
.md-toast-content {
    padding: 0.4rem 0.5rem;
}
.md-toast-text {
    font-size: 1rem;
}

.captchaIpt {
    outline: none;
    border: none;
    font-size: 1rem;
    text-indent: .5rem;
    border: 1px solid rgb(236, 121, 121);
    height: 100%;
    flex: 1;
    border-radius: 5px;
    margin-left: .2rem;
}
.captchaText {
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgb(236, 121, 121);
    vertical-align: middle!important;
    padding: 0!important;
    margin: 0!important;
}


html{
    font-size: 16px!important;
}
@media screen and ( min-width: 319px ) {
  html {
    font-size: 12px!important;
  }
}
@media screen and ( min-width: 360px ) {
  html {
    font-size: 14px!important;
  }
}
@media screen and ( min-width: 375px ) {
  html {
    font-size: 16px!important;
  }
}
@media screen and ( min-width: 414px ) {
  html {
    font-size: 16px!important;
  }
}
@media screen and ( min-width: 768px ) {
  html {
    font-size: 20px!important;
  }
}
@media screen and ( min-width: 1024px ) {
  html {
    font-size: 28px!important;
  }
}
</style>
