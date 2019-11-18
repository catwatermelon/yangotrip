<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$axios.get('/api/userInfo').then(res=>{
        if(res.data.status) {
            const userinfo = res.data.data;
            //将通过token请求的用户信息存到vuex中
            this.$store.dispatch('user/LOGIN',{
                username: userinfo.username,
                password: userinfo.password
            })
        }
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font: none!important;
}

body,html,#app {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  height: calc(100% - 3.75rem);
  overflow: hidden;
}

</style>
