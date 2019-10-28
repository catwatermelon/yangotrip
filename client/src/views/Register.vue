<template>
    <div class="register">
        <div class="formContainer">
            <h2>注册账号</h2>
            <form action="">
                <div class="form-group">
                    <input v-model="accountNumber" type="text" name="username" id="username" placeholder="请输入账号">
                </div>
                <div class="form-group">
                    <input v-model="password" type="password" name="password" id="password" placeholder="请输入密码">
                </div>
                <div class="form-group" style="display: flex;">
                    <input v-model="mobileCaptcha" type="text" name="mobileCaptcha" id="mobileCaptcha" placeholder="请输入验证码">
                    <button id="getMobileChapcha" type="button" @click="getMobileChapcha">获取验证码</button>
                </div>
                <div class="form-group">
                    <button id="registerBtn" @click.prevent="register">立即注册</button>
                </div>
            </form>

            <div class="jumpLogin">
                <router-link style="margin-left: auto" :to="{name: 'Login'}">返回登陆页面</router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
import { Toast } from 'mand-mobile'
export default {
    name: 'register',
    data(){
        return {
            accountNumber: '',
            password: '',
            mobileCaptcha: ''
        }
    },
    methods: {
        register(){
            if(!(/^1[3456789]\d{9}$/.test(this.accountNumber))){ 
                Toast.failed("请填写正确的手机号码！");
                return; 
            }
            if(!this.password)
                return;
            if(!this.mobileCaptcha){
                Toast.failed("请输入验证码！");
                return; 
            }
            this.$axios.post('/api/register',{
                accountNumber: this.accountNumber,
                password: this.password,
                mobileCaptcha: this.mobileCaptcha
            }).then(res=>{
                if(res.data.status){
                    Toast.succeed('注册成功！');
                    this.$router.push({name:'Login'});
                } else 
                    Toast.failed("该账号已存在或重新尝试！");
            })
        },
        getMobileChapcha(){
            this.$axios.post('/api/mobileCaptcha',{
                accountNumber: this.accountNumber
            }).then(res=>{
                // console.log(res);
                if(res.data.status){
                    // this.mobileCaptcha = res.data.data;
                } else {
                    Toast.failed('验证码发送失败，请重新尝试！');
                }
            })
        }
    }
}
</script>

<style>
.register {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:  center;
    align-items: center;
}

.register h2 {
    text-align: center;
    margin-bottom: 3.125rem;;
}
.register .formContainer {
    width: 90%;
}

.register form {
    width: 100%;
    margin-top: 1.875rem;
}

.register form .form-group {
    width: 100%;
    height: 3.125rem;
    margin-bottom: 1.25rem;
}

.register #username,.register #password, .register #mobileCaptcha {
    width: 100%;
    height: 100%;
    font-size: 1rem;
    text-indent: 1rem;
    border: none;
    border-bottom: 1px solid rgb(58, 58, 58);
    border-radius: 0.3125rem;
    outline: none;
    background-color: transparent;
}

.register #mobileCaptcha {
    border: 1px solid rgb(58, 58, 58);
    /* width: auto; */
    flex: 1;
}
.register #getMobileChapcha {
    height: 100%;
    padding: 0 1rem;
    font-size: 1rem;
    margin-left: .4rem;
    border: none;
    color: white;
    background-color: #3487ff;
    border-bottom: 1px solid rgb(58, 58, 58);
    border-radius: 0.3125rem;
    outline: none;
}

.register #registerBtn {
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #3487ff;
    border: none;
    color: white;
}
.jumpLogin {
    display: flex;
    justify-content: flex-end;
}

.md-toast-content {
    padding: 0.4rem 0.5rem;
}
.md-toast-text {
    font-size: 1rem;
}
</style>
