<template>
    <div id="index">
        <div class="container">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <div class="navBar">
            <router-link v-for="(navBar,index) in navBarList" :key="navBar.title" :to="navBar.path" @click.native="currentBar = index" >
                <img :src="navBar.icon" alt="">
                <i :class="{heightlight: currentBar == index }">{{navBar.title}}</i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      navBarList: [
        { title:'首页', path:'/home', icon: require('../assets/shouye.png') },
        { title:'关于我们', path:'/about', icon: require('../assets/guanyuwomen.png') },
        // { title:'首页', path:'/home', icon:'../assets/shouye.png' },
        { title:'我的', path:'/user', icon: require('../assets/wode.png') },
      ],
      currentBar: 0
    }
  },
  methods: {

  }
  
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body,html,#index {
  height: 100%;
  width: 100%;
}
#index {
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
#index .navBar {
  box-sizing: border-box;
  border-top: 0.125rem solid transparent;
  height: 3.75rem;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(243, 208, 208, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
#index  .navBar a {
  flex: 1; 
  display: flex;
  height: 3.75rem;
  /* line-height: 60px; */
  width: 100%;
  text-decoration: none;
  color: black;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#index .navBar img {
  height: 2rem;
  width: 2rem;
}
i {
  font-style: normal;
  font-size: .8rem;
  font-weight: bold;
}
#index .router-link-active {
  box-sizing: border-box;
  border-top: 0.125rem solid rgb(165, 165, 247);
}
.heightlight {
  color: rgb(165, 165, 247);
}

</style>
