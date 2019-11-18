<template>
    <div class="home">
        <md-drop-menu @change="selectedTripType" :data="tripTypeList" v-show="!isSearchGroupShow"/>
        <div class="inputContainer" v-show="isSearchGroupShow">
            <div class="inputTop">
                <input v-model="start.startPos" type="text" class="searchIpt" @input="candidates($event,'start')" @change="candidates($event,'start')" placeholder="请输入起始地..." />
                <button @click="selectTripType">{{transportType}}</button>
            </div>
          <div class="inputBottom">
              <input v-model="end.endPos" type="text" class="searchIpt" @input="candidates($event,'end')" @change="candidates($event,'end')" placeholder="请输入目的地..." />
              <button @click="generatePathList">搜索</button>
              <!-- <button @click="test">O</button> -->
          </div>
          <div class="candidatesWrapper">
              <p style="padding: 6px 0;" v-for="location in filterList" :key="location.id" @click="confirmLocation(location)">{{location.address}}</p>
          </div>
          <!-- <div class="candidatesWrapper">
              <scroll-view class="scrollWrapper" >
                <div>
                  <p style="padding: 6px 0;" v-for="location in filterList" :key="location.id" @click="confirmLocation(location)">{{location.address}}</p>

                </div>
              </scroll-view>
          </div> -->
        </div>
        <div class="toggleButtonWrapper">
            <md-icon
              name="arrow-down"
              size="md"
              v-show="isPathListControlShow"
              @click="isPathListShow = !isPathListShow;closeInfoWindow();"
            ></md-icon>
        </div>
        <transition name="fade">
            <div class="planOutsideContainer" v-show="isPathListShow">
                <scroll-view class="scrollWrapper" >
                    <div id="panel">
                        <div></div>
                    </div>
                </scroll-view>
            </div>   
        </transition>
        <div id="mapContainer"></div>
        <div @click="getLocation" style="position: absolute; border: 1px solid grey; height: 36px;width:36px; background:white; display:flex; margin: 0 auto; align-items:center;justify-content:center; z-index: 999;bottom: 4.5rem;right:.9rem;">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" width="28" height="28" t="1574066110456" p-id="3733" version="1.1"><path fill="#2c2c2c" d="M 403.89 579.833 h 216.218 L 511.999 687.915 L 403.89 579.833 Z M 512 64.304 c -134.871 0 -244.198 109.327 -244.198 244.197 c 0 134.872 109.327 244.199 244.197 244.199 s 244.2 -109.327 244.2 -244.199 c 0 -134.87 -109.329 -244.197 -244.2 -244.197 Z m 0 434.129 c -104.903 0 -189.932 -85.03 -189.932 -189.932 c 0 -104.902 85.03 -189.93 189.931 -189.93 c 104.876 0 189.932 85.03 189.932 189.93 c 0 104.903 -85.056 189.932 -189.932 189.932 Z" p-id="3734" /><path fill="#2c2c2c" d="M 512 199.968 c 59.936 0 108.532 48.596 108.532 108.533 c 0 59.937 -48.595 108.533 -108.533 108.533 S 403.467 368.44 403.467 308.501 c 0 -59.936 48.596 -108.533 108.532 -108.533 Z M 874.586 742.648 c 28.392 -20.357 44.41 -43.418 44.41 -67.85 c 0 -62.813 -105.923 -116.523 -255.83 -138.518 c -0.431 0.287 -0.865 0.57 -1.298 0.853 c 119.86 19.502 202.861 61.655 202.861 110.534 c 0 23.025 -18.423 44.56 -50.428 62.94 c -60.807 -24.702 -143.834 -41.914 -237.528 -47.414 l -0.116 0.116 c 95.09 6.1 176.794 25.397 228.646 52.197 c -63.279 32.716 -171.018 54.259 -293.304 54.259 c -122.285 0 -230.023 -21.543 -293.303 -54.26 c 51.853 -26.798 133.556 -46.096 228.646 -52.196 l -0.117 -0.116 c -93.695 5.5 -176.72 22.712 -237.528 47.414 c -32.006 -18.38 -50.428 -39.915 -50.428 -62.94 c 0 -48.88 83.001 -91.032 202.86 -110.534 c -0.432 -0.283 -0.866 -0.566 -1.296 -0.853 c -149.908 21.995 -255.831 75.705 -255.831 138.519 c 0 24.431 16.018 47.492 44.41 67.85 c -28.391 20.342 -44.41 43.39 -44.41 67.816 c 0 82.405 182.221 149.231 406.997 149.231 s 406.998 -66.826 406.998 -149.231 c -0.001 -24.426 -16.02 -47.474 -44.411 -67.817 Z M 511.999 905.431 c -194.806 0 -352.73 -54.664 -352.73 -122.1 c 0 -9.738 3.314 -19.207 9.538 -28.286 c 72.295 41.48 198.985 68.986 343.191 68.986 s 270.898 -27.507 343.193 -68.986 c 6.224 9.08 9.538 18.548 9.538 28.287 c 0.001 67.435 -157.923 122.099 -352.73 122.099 Z" p-id="3735" /></svg>  
        </div>
        <div class="navigation">
            <div id="maincate" class="maincate" >
                <div v-for="(item, index) in items" :key="index" @click="GenerateMarkers(item.content, index)">
                    <div :class="['has-flex-direction',{'marker-group-lightheight':  index && currentShowMarkerGroup == index}]" >
                    <!-- <img :src=item.img> -->
                    {{item.content}}
                    </div>
                </div>
            </div>
        </div>

      <md-popup
      v-model="isLoadingLocation"
      transition="md-slide-down"
      >
        <div class="md-example-popup md-example-popup-center">
        <p>定位中...</p>
        </div>
      </md-popup>
    </div>
</template>

<script>
import Scroll from '../components/Scroll.vue'
import { Toast, Popup, Button } from 'mand-mobile'

export default {
  name: 'home',
  data () {
    return {
      isSearchGroupShow: true,
      map: null,
      tripTypeList: [
        {
          text: '出行方式选择',
          options: [
            {
              value: 'Driving',
              text: '驾车',
            },
            {
              value: 'Riding',
              text: '骑行',
            },
            {
              value: 'Walking',
              text: '步行',
            },
          ],
        },
      ],
      tripType: 'Driving',
      transportType: '驾车',
      transport: null,
      keyword: '',
      locationList: [],
      start: {
        startPos: '',
        lnglat: []
      },
      end: {
        endPos: '',
        lnglat: []
      },
      startOrEnd: 'start',
      isPathListShow: false,
      isPathListControlShow: false,
      items:[
				{ content: '清除标记', img: './icon/路线0.png' },
				// { content: '路线', img: './icon/路线0.png' },
				// { content: '景区', img: './icon/景区0.png' },
				{ content: '运动', img: './icon/景区0.png' },
				{ content: '美食', img: './icon/美食0.png' },
				// { content: '停车场', img: './icon/停车场0.png' },
				{ content: '教学楼', img: './icon/厕所0.png' },
				{ content: '宿舍', img: './icon/住宿0.png' },
				{ content: '出入口', img: './icon/出入口0.png' },
				{ content: '服务中心', img: './icon/游客中心0.png' }
      ],
      overlayGroups: null,  //覆盖物群组
      startMarker: null,
      endMarker: null,
      geolocation: null,
      currentShowMarkerGroup: 0,
      userCurrentPosition: "",
      locationTimer: null,
      isLoadingLocation: false
    }
  },
  computed: {
    filterList(){
      if(this.keyword == '')
       return [];
      return this.locationList.filter((item)=>{
        if(item.address.match(this.keyword) != null)
          return item;
      })
    } 
  },
  methods: {
    // test(){
    //   console.log('123');
    //   this.geolocation.watchPosition((status,result)=>{
    //     console.log(status, result)
    //     if(status=='complete'){
    //       // userCurrentPosition
    //       console.log(result)
    //       // console.log(result.formattedAddress)
    //       this.start.startPos = result.formattedAddress;
    //       // that.start.startPos.lat = result.position.formattedAddress;
    //       // console.log(result.position)
    //       const position = result.position;
    //       this.start.lnglat = [];
    //       this.start.lnglat.push(position.lng);
    //       this.start.lnglat.push(position.lat);
    //     }
    //   })
    // },
    candidates(event, startOrEnd){
      this.keyword = event.target.value;
      this.isPathListControlShow = false;
      this.isPathListShow = false;
      this.startOrEnd = startOrEnd == 'start' ? 'start' : 'end';
      this[this.startOrEnd][this.startOrEnd + 'Pos'] = this.keyword;
    },
    selectTripType(){
      this.isSearchGroupShow = false;
      this.isPathListControlShow = false;
      this.isPathListShow = false;
    },
    selectedTripType(barItem, listItem){
      this.isSearchGroupShow = true;
      // this.isPathListControlShow = true;
      // this.isPathListShow = true;
      this.start.startPos && this.endPos && (this.isPathListControlShow = this.isPathListShow = true);

      this.tripType = listItem.value;
      this.transportType = listItem.text;
    },
    confirmLocation(location) {
      //显示点标记
      this.startMarker && this.startMarker.show();
      this.endMarker && this.endMarker.show();

      this[this.startOrEnd][this.startOrEnd + 'Pos'] = location.address;
      this[this.startOrEnd].lnglat = [];
      this[this.startOrEnd].lnglat.push(location.lnglat.split(',')[0])
      this[this.startOrEnd].lnglat.push(location.lnglat.split(',')[1])
      // this.startOrEnd == 'start' && this.map.setCenter(this[this.startOrEnd].lnglat);
      this.map.setCenter(this[this.startOrEnd].lnglat);

      //创建起始点标记
      const label = this.startOrEnd == 'start' ? '起' : '终';
      AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker)=> {
        
        //清除原先的点标记
        this[this.startOrEnd + 'Marker'] && this.map.remove(this[this.startOrEnd + 'Marker']);
        this[this.startOrEnd + 'Marker'] = new SimpleMarker({
            //普通文本
            iconLabel: {
              innerHTML: label,
              style: {
                color: 'white'
              }
            },
            map: this.map,
            iconStyle: 'red',
            position: this[this.startOrEnd].lnglat
        });
    });

      this.keyword = '';
    },
    generatePathList(){
      this.transport && this.transport.clear();
      // this.map.remove(this.startMarker);
      // this.map.remove(this.endMarker);
      this.startMarker && this.startMarker.hide();
      this.endMarker && this.endMarker.hide();
      this.closeInfoWindow();
      this.transport = null;
      AMap.plugin(`AMap.${this.tripType}`, ()=> {
        this.transport = new AMap[this.tripType]({
          map: this.map,
          panel: "panel"
        })
        var startLnglat = [parseFloat(this.start.lnglat[0]), parseFloat(this.start.lnglat[1])];
        var endLnglat = [parseFloat(this.end.lnglat[0]), parseFloat(this.end.lnglat[1])];

        this.transport.search(startLnglat, endLnglat, (status, result)=> {
          // 未出错时，result即是对应的路线规划方案
          // console.log(result)
          this.isPathListControlShow = true;
          this.isPathListShow = true;
        })
      })
    },
    GenerateMarkers(type, index) {
      this.currentShowMarkerGroup = index;
      var that = this;
      that.closeInfoWindow();
      if(type == '路线') {
        this.overlayGroups && this.map.remove(this.overlayGroups);
        return;
      } else if(type  == '清除标记') {
        this.overlayGroups && this.map.remove(this.overlayGroups);
      }
      this.overlayGroups && this.map.remove(this.overlayGroups);
      // this.overlayGroups && this.overlayGroups.clearOverlays();
      //获取特定景点选项，生成marker
      var list = this.locationList.filter(item=>{
        return item.type == type;
      })

      var markers = [];
      AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
        var iconTheme = 'fresh';
        //内置的样式
        var iconStyles = SimpleMarker.getBuiltInIconStyles(iconTheme);

        for (let i = 0; i < list.length; i++) {
        var marker = new SimpleMarker({
          iconTheme: iconTheme,
            //使用内置的iconStyle
            iconStyle: iconStyles[i],
            //图标文字
            iconLabel: {
              //A,B,C.....
              innerHTML: String.fromCharCode('A'.charCodeAt(0) + i),
              style: {
                  //颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                  color: iconStyles[list.length - 1 - i]
              },
            },
            position: new AMap.LngLat(list[i].lnglat.split(',')[0], list[i].lnglat.split(',')[1]),
            extData: {
              location: list[i]
            }
        });

        marker.setAnimation('AMAP_ANIMATION_DROP');
        markers.push(marker);
        }
        markers.forEach((item,index)=>{
          const extData = item.getExtData();
          const location = extData.location;
          // console.log(location)
          //信息窗体内容
          var title = `${location.address}<span style="font-size:16px;color:#F00;">[${location.type}]</span>`,
              content = [];
          if(location.desc_img)
            content.push(`<img src='/img/${location.desc_img}'>`);
          else
            content.push("<img src='img/076b197244ad771331cffdb49e6c2967.jpg'>");
          var infoWindow = new AMap.InfoWindow({
              autoMove: false,
              isCustom: true,  //使用自定义窗体
              content: that.createInfoWindow(title, content.join("<br/>")),
              offset: new AMap.Pixel(16, -45)
          });
          //鼠标点击marker弹出自定义的信息窗体
          AMap.event.addListener(item, 'click', function () {
              that.closeInfoWindow();
              that.map.setCenter(new AMap.LngLat(location.lnglat.split(',')[0], location.lnglat.split(',')[1]));
              infoWindow.open(that.map, item.getPosition());
          });
        })
        // 创建覆盖物群组，并将 marker 传给 OverlayGroup
        that.overlayGroups = new AMap.OverlayGroup(markers);
        that.overlayGroups.setMap(that.map);
        that.map.setFitView();
      })
    },
    createInfoWindow(title, content) {
      var that = this;
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = that.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = 'white';
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = 'relative';
      bottom.style.top = '0px';
      bottom.style.margin = '0 auto';
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
    getLocation(){
      const that = this;
      if(this.locationTimer) {
        // console.log("删除定时器")
        clearInterval(this.locationTimer);
        this.locationTimer = null;
      }
      this.isLoadingLocation = true;
      that.geolocation.getCurrentPosition((status,result)=>{
        if(status=='complete'){
          // console.log(result)
          // Toast.succeed(result);
          // console.log(result.formattedAddress)
          // that.start.startPos = result.formattedAddress;
          that.isLoadingLocation = false;
          const position = result.position;
          that.start.lnglat = [];
          that.start.lnglat.push(position.lng);
          that.start.lnglat.push(position.lat);
          that.map.setCenter(new AMap.LngLat(that.start.lnglat[0], that.start.lnglat[1]));
       }
      })
      this.locationTimer = setInterval(startLocation, 3000);
      function startLocation(){
        that.geolocation.getCurrentPosition((status,result)=>{
          if(status=='complete'){
            console.log(result)
          } else {
            Toast.failed("定位出错");
          }
        })
      }
    }
  },
  mounted(){
    var that = this;
    this.map = new AMap.Map('mapContainer', {
        center: [119.448084,26.00394],
        zoom: 16
    });
    this.map.on('complete', function(){
      // 地图图块加载完成后触发
      AMap.plugin(['AMap.Geolocation'],function(){//异步加载插件
        that.geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,     
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
        });
        // that.map.addControl(that.geolocation);
      })
    });
    
  },
  created(){
    this.$axios.get('/api/location').then(res=>{
      this.locationList = res.data;
    })
  },
  components: {
    ScrollView: Scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home, #mapContainer{
  height: 100%;
  width: 100%;
  position: relative;
}
.inputContainer {
  position: fixed;
  width: 100%;
  z-index: 999;
  padding: 0.25rem 0px 0.25rem 0px;
  /* background-color: white; */
  background-color: rgb(225, 248, 247);
  /* background-color: rgba(165, 165, 247, .4); */
  box-shadow: 0px 0.25rem 0.375rem rgba(0, 0, 0, 0.16);
}
.inputTop,.inputBottom {
  width: 100%;
  display: flex;
  margin: 0.25rem 0px;
  justify-content: center;
  align-items: center;
  /* border: none; */
  /* background-color: grey; */
}
.inputTop button,.inputBottom button {
  width: 5rem;
  background-color: white;
  border-style: none;
  color: #3086F5;
  outline: none;
  border: 1px solid #3086F5;
  padding: 0.4375rem;
  display: block;
  font-size: 1rem;
  box-sizing: border-box;
  margin: 0px 0.25rem;
  border-radius: 0.3125rem;
}
.inputBottom button {
  background-color: #3086F5;
  color: white;
}
.home .searchIpt {
    display: block;
    width: 70%;
    height: 2rem;
    padding: 2px 0.4375rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.2);
    border-radius: 0.25rem;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.amap-copyright {
  display: none!important;
}
.amap-logo {
  display: none!important;
}
.amap-call {
  display: none;
}

.md-field {
  background-color: rgba(99, 241, 199, 0.7)
  /* background-color: rgba(99, 241, 199, 0.7) */
}

.home .md-cell-item-body {
    min-height: 3rem;
    border-top: 1px solid rgba(0,0,0,.051);
    padding: 0.625rem!important;
}
.home .md-drop-menu-list{
    padding-top: 3.5rem;
}
.home .md-cell-item-title {
  font-size: 1.125rem;
}
.home .md-drop-menu-bar {
    padding: 0.6rem;
    height: 2.5rem;
    font-size: 1rem;
}
.home .bar-item>span {
  font-size: 1rem;
}

.candidatesWrapper {
  /* position: absolute; */
  background-color: rgba(255, 254, 254, 0.05);
}

#panel {
  position: absolute;
  width: 100%;
}
.amap-lib-driving {
  background-color: rgba(255,255,255,.9);
}
.toggleButtonWrapper {
  position: absolute;
  width: 100%;
  background-color: rgb(244, 247, 252);
  top: 5.9375rem;
  z-index: 9999;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /* top: 100%; */
  opacity: 0;
}
.scrollWrapper {
    position: absolute;
    z-index: 1;
    top: 0px;
    height: 100%;
    right: 0;
    left: 0;
    overflow: hidden;
    background-color: transparent;
}

.planOutsideContainer {
    position: absolute;
    top: 7.9375rem; 
    left: 0;
    right: 0;
    height: calc(100% - 8.075rem);
    background-color: rgba(255,255,255,.9);
    z-index: 99999;
}

/* 滑块tab bar */
.maincate {
  font-size: .9rem;
  font-weight: bold;
  position: absolute;
  z-index: 999;
  bottom: 0px;
  display: flex;
  width: 100%;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  text-align: justify;
  background: #fff;
  padding: 0.625rem 0.3125rem;
  box-sizing: border-box;
}

.has-flex-direction {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  margin: 0 0.625rem;
  padding: 2px 0.625rem;
}
.maincate::-webkit-scrollbar {
  display: none;
}

/* 信息窗体 样式 */
.content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
}

.content-window-card p {
    height: 2rem;
}

.custom-info {
    border: solid 1px silver;
}

div.info-top {
    position: relative;
    background: none repeat scroll 0 0 #F9F9F9;
    border-bottom: 1px solid #CCC;
    border-radius: 0.3125rem 0.3125rem 0 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0.625rem;
}

div.info-top div {
    display: inline-block; 
    color: #333333;
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0 auto;
    /* text-align: center; */
    line-height: 1.9375rem;
    /* padding: 0 10px; */
}

div.info-top img {
    justify-self: flex-end;
    /* margin-left: auto; */
    height: 0.875rem;
    transition-duration: 0.25s;
}

div.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
}

div.info-middle {
    font-size: 0.75rem;
    padding: 0.625rem 0.375rem;
    display: flex;
}

div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
}

div.info-bottom img {
    position: relative;
    z-index: 104;
}

div.info-top span {
    margin-left: 0.3125rem;
    font-size: 0.8575rem!important;
}

.info-middle img {
  height: 12.5rem;
}
.marker-group-lightheight {
  background-color: rgb(165, 165, 247);
  border-radius: .8rem;
  color: white;
}


.md-example-popup {
    position: relative;
    font-size: 1,5rem;
    font-family: DINAlternate-Bold;
    font-weight: 500;
    box-sizing: border-box;
    text-align: center;
    background-color: #FFF;
}
    
.md-example-popup-center {
  padding: 30px;
  border-radius: radius-normal;
}
</style>
