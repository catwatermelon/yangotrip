<template>
    <div class="about">
        <!-- <img src="../assets/1.gif" alt="">
        <img src="../assets/2.gif" alt=""> -->
        <form class="" action="/api/profile" method="post" enctype="multipart/form-data">
            <input type="file" name="location" value="" multiple>  <!--multiple 可上传多张  -->
            <input type="submit" name="" value="上传">
        </form>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile'
export default {
    name: 'about',
    data(){
        return {

        }
    },
    methods:{
        uploadFiles(event){
            // const file = event.target.files[0];
            // console.log(file);
            // const formDate = new FormData();
            // formDate.append("avatar", file);
            // this.$axios.post('/api/profile').then(res=>{
            //     // console.log(res);
            //     if(res.data)
            //         Toast.succeed("Successed!")
            //     else 
            //         Toast.failed('filed');
            // })
        }
    }
}
</script>

<style>
.about {
    height: 100%;
    /* height: calc(100% - 60px); */
    display: flex;
    flex-direction: column;
}
.about img {
    /* flex: 1; */
    height: 50%;
}
</style>