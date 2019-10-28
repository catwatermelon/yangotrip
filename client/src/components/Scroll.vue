<template>

  <div class="scroll" ref="scroll">

    <slot></slot>

  </div>

</template>



<script>

import BScroll from 'better-scroll'

export default {

  name: 'ScrollView',

  data () {

    return {

     scroll: null

    }

  },

  methods:{

    init(){

      this.scroll = new BScroll(this.$refs.scroll,{

          scrollY: true,

          click: true,    //启用点击事件

          probeType: 3,

          mouseWheel: true  //启用滚轮

      });

      this.scroll.on('scroll',pos=>{

        this.$emit('scroll',pos);

      })

    },

    scrollToElement(element,time){

      this.scroll.scrollToElement(element,time);

    },

    scrollTo(x,y,time){

      this.scroll.scrollTo(x,y,time);

    },

    refresh(){

      this.scroll.refresh();

    }

  },

  mounted(){

    this.$nextTick(()=>{

      this.init();

    })

    // var that = this;

    // window.addEventListener('resize',()=>{

    //     // console.log(this)

    //     that.refresh();

    // });

  }

}

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>