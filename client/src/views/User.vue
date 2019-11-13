<template>
    <div class="user">
        <div class="accountInfo">
            <img class="photo" src="../assets/yonghutouxiang.png" alt="">
            <div>
                <p class="name">{{accountNumber}}</p>
                <span style="margin: 0">账号: </span><span>{{accountNumber}}</span>
            </div>
        </div>
        <div style="background-color: rgba(255,255,255,.8); height: calc(100% - 5.5rem)">
            <div class="service" v-for="item in items" :key="item.name" @click="operation(item.icon)">
                <md-icon  :name="item.icon" style="margin-right: .7rem" size="md"></md-icon>
                <span style="font-size: .94rem; font-weight: bold">{{item.label}}</span>
                <md-icon class="arrow-right" name="arrow-right" size="sm"></md-icon>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    name: 'user',
    data(){
        return {
            items: [
                // { label: '帮助', icon: 'question' },
                // { label: '设置', icon: 'setting' },
                { label: '退出', icon: 'close'}
            ]
        }
    },
    methods: {
        ...mapActions({
            logout: 'user/LOGOUT'
        }),
        operation(icon){
            if(icon == 'close'){
                this.logout();
                this.$router.push({name: 'Login'});
            } else if(icon == 'question') {
                alert("臭弟弟要什么帮助????");
            }
        }
    },
    computed:{
        ...mapGetters({
            accountNumber: 'user/getAccountNumber',
        })
    }
}
</script>
<style>
.user {
    height: 100%;
    width: 100%;
    background: url(../assets/yango.png) 0 0 no-repeat;
    background-size: cover;
}
.user img {
    height: 2rem;
    width: 2rem;
}
.user .accountInfo {
    background-color: rgba(8, 183, 252, 0.1);
    display: flex;
    align-items: center;
    height: 5.5rem;
    box-sizing: border-box;
}

.user .photo {
    margin: 0.3rem .8rem;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;

}
.user .name {
    text-align: left;
    margin-bottom: 0.375rem;
    font-size: 1rem;
    font-weight: bold;
}
.user .accountInfo span {
    font-size: .8rem;
}
.user .service {
    box-sizing: border-box;
    padding: .7rem 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.user .arrow-right {
    margin-left: auto;
}
</style>