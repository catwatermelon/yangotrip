<template>
    <div class="about">
        <!-- <img src="../assets/1.gif" alt="">
        <img src="../assets/2.gif" alt=""> -->
        <!-- <form class="" action="/api/profile" method="post" enctype="multipart/form-data">
            <input type="file" name="location" value="" multiple>  
            <input type="submit" name="" value="上传">
        </form> -->
        <div style="text-align: left; padding: 1.5rem 1rem">
            <p class="group_name">6组西瓜战队</p>
            <p class="group_name">战队成员：</p>
            <ul>
                <li>林振通</li>
                <li>张邦静</li>
                <li>蔡学敏</li>
                <li>王于诠</li>
                <li>王鹏程</li>
                <li>李志增</li>
            </ul>
        </div>

        <div id="main" style="width: 100%;height:24rem;"></div>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile'
import echarts from 'echarts'
export default {
    name: 'about',
    data(){
        return {
            myChart: null
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
    },
    mounted(){
        this.myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: '技术栈',
                // subtext: '   ',
                x:'center',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: '10%',
                data: ['Vue.js','Node.js','SSM','Echart.js','MySQL']
            },
            series : [
                {
                    name: '技术占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:25, name:'Vue.js'},
                        {value:15, name:'Node.js'},
                        {value:40, name:'SSM'},
                        {value:5, name:'Echart.js'},
                        {value:15, name:'MySQL'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
    }
}
</script>

<style>
.about {
    height: 100%;
    /* height: calc(100% - 60px); */
    display: flex;
    background-color: rgb(253, 240, 223);
    flex-direction: column;
}
.about img {
    /* flex: 1; */
    height: 50%;
}
.about .group_name {
    font-weight: bold;
    font-size: 1.2rem;
}
.about ul {
    font-size: 1.1rem;
}
.about ul li {
    padding: .4rem;
    float: left;
}
</style>