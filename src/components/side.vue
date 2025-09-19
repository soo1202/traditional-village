<script lang="ts">
  import { defineComponent } from 'vue';
  import Header from '../view/header.vue';
  import { onMounted, ref, reactive, shallowRef } from 'vue';
  import * as AMapLoader from '@amap/amap-jsapi-loader';
  import { ElMessage } from 'element-plus';
  import axios from "axios";
  import { useGlobalStore } from '../stores/globalStore';
  import { storeToRefs } from 'pinia'
  import {Close, Edit} from "@element-plus/icons-vue";
  import router from "../router";
  // 放在 <script lang="ts"> 顶部，import 语句之后，加上这个声明
  declare global {
    interface Window {
      _AMapSecurityConfig?: {
        securityJsCode: string;
      };
    }
  }

  export default defineComponent({
    name: 'Side',
    computed: {
      Edit() {
        return Edit
      },
      Close() {
        return Close
      },
    },
    components: {
      Header,
    },

    setup() {
      const  goSidehistory=()=>{
       router.push({
        path: '/sidehistory',
      })
      }
      const dragPanel = ref<HTMLElement | null>(null);

      onMounted(() => {
        const panel = dragPanel.value;
        if (!panel) return;

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e: MouseEvent) => {
          isDragging = true;
          offsetX = e.clientX - panel.offsetLeft;
          offsetY = e.clientY - panel.offsetTop;
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;
          panel.style.left = `${e.clientX - offsetX}px`;
          panel.style.top = `${e.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        panel.addEventListener('mousedown', onMouseDown);
      });
      /////////////////////////////////
      const displayText = ref('');
      const startplace = ref('');
      const {basictext,basicimg,featureimg1,featuretext,featureimg2,ecodevimg,ecodevtext,SideName}=storeToRefs(useGlobalStore())
      let sidename=localStorage.getItem('side');//获取点击村落的名称内容
      const searchResults : any= ref([]);//存储数据库结果
     let images=[
      { src: '/img/cl.jpg', alt: 'Image 1' },
      {
        src: '/img/cl.png', alt: 'Image 2'
      },
      {
        src: '/img/R-C.jpg', alt: 'Image 3'
      },
      {
        src: '/img/cl2jpg.jpg', alt: 'Image 4'
      }
    ]
    let flag = ref(0);//三维切换
     let routeflag=ref(false);//路线规划
    let username = ref("");
    let map = shallowRef();
// 定义地图属性
let mapOptions = reactive({
      zoom: 16,
      pitch: 70,
      rotation: 0,
      viewMode: '2D',
      buildingAnimation: true,
      center: [0, 0],
    });
let AMap = ref<any>(null); // 新增 AMap 响应式变量
// 数据库数据获取与加载地图
onMounted(async () => {
        // 从数据库中读取信息
        try {
          const response = await axios.get('http://106.53.189.150:3000/sideinfo', {
            params: { query: sidename } // 将输入的搜索内容作为查询参数
          });
          const response2= await axios.get('http://106.53.189.150:3000/sidedata', {
            params: { query: sidename } // 将输入的搜索内容作为查询参数
          });
          basictext.value=response2.data[0].basictext;
          basicimg.value=response2.data[0].basicimg;
          featuretext.value=response2.data[0].featuretext;
          featureimg1.value=response2.data[0].featimg1;
          featureimg2.value=response2.data[0].featimg2;
          ecodevimg.value=response2.data[0].ecodevimg;
          ecodevtext.value=response2.data[0].ecodevtext;
          SideName.value=response2.data[0].village_name;
          searchResults.value = response.data[0]; // 取数组的第一个对象
          mapOptions.center = [searchResults.value.longitude, searchResults.value.latitude];
          localStorage.setItem('lat', searchResults.value.latitude)
          localStorage.setItem('lot', searchResults.value.longitude);
          initMap();
          localStorage.setItem('longitude', searchResults.value.longitude);
          localStorage.setItem('latitude', searchResults.value.latitude);
          localStorage.setItem('sideimg', searchResults.value.sideimg);
          localStorage.setItem('sidevideo', searchResults.value.sidevideo);
          localStorage.setItem('featvideo', searchResults.value.featvideo);
          localStorage.setItem('geoinfo', searchResults.value.geoinfo);
          localStorage.setItem('shortdes', searchResults.value.shortdes);
          localStorage.setItem('culback', searchResults.value.culback);
          localStorage.setItem('localcharacter', searchResults.value.localcharacter);
          let index = 0;
          const typeWriter = () => {
            if (index < searchResults.value.shortdes.length) {
              displayText.value += searchResults.value.shortdes[index];
              index++;
              setTimeout(typeWriter, 100);
            }
          };
          typeWriter();
        } catch (error) {
          console.error("获取数据时出错:", error);
        }
      });
// 加载地图工具与
const add_tool = (AMap: any) => {
      const scale = new AMap.Scale();
      const toolbar = new AMap.ToolBar({
        position: { top: '100px', right: '15px' }
      });
      const controlBar = new AMap.ControlBar({
        position: { top: '85px', right: '50px' }
      });
      map.value.addControl(scale);
      map.value.addControl(toolbar);
      map.value.addControl(controlBar);
    };
const initMap = async () => {
      try {
        window._AMapSecurityConfig = {
          securityJsCode: "4cece898a72fadd654d4556ee422041a", // ⚠️ 请替换成你自己控制台里的
        };
        AMap.value = await AMapLoader.load({
          key: "bdbbe5e3f3622e6d2a57ee803e1a24b9",
          version: "2.0",
          plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar","AMap.Driving"],
        });
        map.value = new AMap.value.Map('mapcontainer', mapOptions);
        add_tool(AMap.value);
      } catch (e) {
        console.log(e);
      }
    };

//三维，二位切换
const show3DMap = () => {
  if (!flag.value) {
    // mapOptions.viewMode = '3D';
    flag.value = 1;
    // initMap();
  } else {
    ElMessage({
      message: '已经是三维了',
      type: 'error',
      plain: true,
    });
  }
};
const show2DMap = () => {
  if (flag.value) {
    // mapOptions.viewMode = '2D';
    flag.value = 0;
    initMap();
  } else {
    ElMessage({
      message: '已经是二维了',
      type: 'error',
      plain: true,
    });
  }
};
//路线规划
const routeData: any = ref([]);
const start = ref('');
      const getroute = async () => {
        if (!startplace.value) {
          ElMessage({
            message: '请输入起点!',
            type: 'error',
            plain: true,
          });
          return;
        }

        try {
          // 1. 获取起点经纬度
          const geoResponse = await axios.get(
              `https://restapi.amap.com/v3/geocode/geo?address=${startplace.value}&output=json&key=7f12708bee5f6220bafcb4e631454a99`
          );
          const location = geoResponse.data.geocodes[0].location;
          const [lon, lat] = location.split(',');

          // 2. 获取路径文本信息（可选）
          const routeResponse = await axios.get(
              `https://restapi.amap.com/v3/direction/driving?origin=${lon},${lat}&destination=${searchResults.value.longitude},${searchResults.value.latitude}&extensions=all&output=json&key=7f12708bee5f6220bafcb4e631454a99&securityJsCode=4cece898a72fadd654d4556ee422041a`
          );
          routeData.value = routeResponse.data.route.paths[0].steps;

          // 3. 设置起点显示
          start.value = startplace.value;
          startplace.value = '';

          // 4. 使用 JS SDK 绘制路线
          AMap.value.plugin('AMap.Driving', () => {
            const driving = new AMap.value.Driving({
              map: map.value,
              policy: 0,
              panel: "panel", // 可选，路线详情展示 DOM
            });

            const startLngLat = [lon, lat];
            const endLngLat = [
              parseFloat(searchResults.value.longitude),
              parseFloat(searchResults.value.latitude),
            ];
            driving.search(startLngLat, endLngLat, function (status: any, result: any) {
              if (status === 'complete') {
                map.value.clearMap();
                map.value.setFitView();
                map.value.setCenter(startLngLat);
                map.value.setZoom(17)
              } else {
                ElMessage({
                  message: '驾车路线绘制失败',
                  type: 'error',
                });
                console.log(result);
              }
            });
          });
        } catch (err) {
          ElMessage({
            message: '获取路线失败，请检查网络或输入是否正确',
            type: 'error',
          });
        }
      };
      const changeMap = () => {
        routeflag.value=false;
        map.value.clearMap();
        initMap();
      };
      const htmlSrc = '/ces.html';
    return {
      goSidehistory,
      changeMap,
      displayText,
      htmlSrc,
      start,
    routeData,
      getroute,
      startplace,
      routeflag,
      searchResults,
      sidename,
      map,
      show3DMap,
      username,
      show2DMap,
      images,
      flag,
      dragPanel,
    };
  }})
  
</script>
<template>
  <div class="container">
    <div class="content">
      <Header />
      <div class="intro">
        <h2>{{sidename}}</h2>
        <p>&nbsp;&nbsp;&nbsp;{{ displayText }}</p>
        <div class="buttoncontainer">
          <button @click="show3DMap" class="bbutton">切换三维</button>
          <button @click="show2DMap" class="bbutton">切换二维</button>
          <button @click="routeflag=true" class="bbutton">路线规划</button>
          <div class="inputAr">
          <div class="route-input" v-if="routeflag">
            <el-input v-model="startplace" placeholder="您当前位置(默认为驾车路线)"></el-input>
            <el-button type="primary" @click="getroute">规划路线</el-button>
            <el-button type="danger" :icon="Close" circle @click="changeMap" />
          </div>
          </div>
        </div>
          <div id="panel" class="route-panel" ref="dragPanel" v-show="routeflag"></div>
        <div id="mapcontainer" v-if="!flag"></div>
        <iframe
            :src="htmlSrc"
            v-if="flag"
        >
        </iframe>
      </div>
      <div class="visualizations">
        <h1>小村先览</h1>
        <el-carousel :interval="3000" type="card" height="35vh" class="carousel-image">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="carousel-image"/>
          </el-carousel-item>
        </el-carousel>
       <div class="text"><span>建筑风格：</span><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宜宾村落的建筑风格属于典型的川南民居，具有传统的四川地方特色。村里的房屋通常为两层或三层，外观简朴但功能性强，屋顶多采用青瓦或红瓦，体现了四川地区的建筑传统。</p>

        <span>建筑特色：</span><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于地处山区，宜宾村的传统建筑常使用当地的木材和石材。房屋的框架多为木材，屋顶梁柱、窗框等部位均采用木材，而墙体则多用石材、砖块或泥土，具有较好的保温和防潮效果。
        “干栏式”建筑：宜宾村落的一些传统建筑采用“干栏式”结构，这种设计源自于四川山区的一种古老建筑形式。干栏式建筑是将木柱插入地下，抬高房屋的底部，使房屋远离潮湿的地面，并能有效防止野生动物的侵袭。
        </p>
        </div>
      </div>
    </div>
  </div>
  <el-tooltip content="发表评论" placement="top">
    <el-button
        type="primary"
        :icon="Edit"
        circle
        size="large"
        @click="goSidehistory"
        style="position: fixed; bottom: 100px; right: 40px; z-index: 1000; font-size: 20px;"
    />
  </el-tooltip>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@700&family=ZCOOL+KuaiLe&display=swap');
.container {
  display: flex;
  width: 100vw;
  height: fit-content;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.content {
    background-color: transparent;
    margin-top: 85px;
    display: flex;
    padding: 20px;
  }
  h2{
    font-size: 1.7rem;
    font-weight: bold;
  }
p{
  margin-top: 5px;
  font-size: 22px;
}
  .intro {
    width: 48vw;
    flex: 1;
    padding: 10px;
  }
.intro p{
  font-family: "Microsoft YaHei", sans-serif;
  color: rgb(27, 15, 15);
}
.visualizations {
  width: 49vw;
  padding: 20px 30px;
  height: auto;
  background-color: transparent;
  margin-bottom: 30px;
}
.visualizations h1 {
  font-family: 'Microsoft YaHei', cursive;
  font-size: 2rem;
  color: #3e3e3e;
  margin-bottom: 20px;
  text-align: center;
  padding-bottom: 10px;
}
.visualizations span {
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
  color: #3a3a3a;
  margin-bottom: 8px;
}
.visualizations p {
  font-size: 1.5rem;
  font-family: "Microsoft YaHei", sans-serif;
  color: rgb(73, 19, 19);
  line-height: 1.9;
  text-indent: 2em;
  margin-bottom: 15px;
}
.text{
  margin-top: 10px;
  background-color: rgb(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.6s ease-in;
  height: fit-content;
}
.text:hover {
    margin-top: 20px;
    border-radius: 20px;
    transform: translateY(-8px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.25);
    background-color: rgb(255, 255, 255, 0.45);
}
.carousel-image {
  display: block;
  width: 100%;
  height: 30vh;
  object-fit: cover;
}

#mapcontainer {
    width: 100%;
    height: 75vh;
  }
.buttoncontainer{
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
}
.bbutton{
  margin-right: 10px;
  background-color: #4CAF50;
  border: 1px solid #0b0e0b;
  border-radius: 5px;
  color: white;
}
.bbutton:hover{
  background-color: #b2d5b3;
}
.bbutton:active{
  background-color: #8eb291;
}
h1{
  color: #4CAF50;
  text-align: center;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  text-decoration: underline;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.route-input{
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
}
.route-input .el-input{
  margin-right: 10px;
  margin-top: 5px;
}
.route-input .el-button{
  margin-top: 5px;
}
iframe {
  width: 100%;
  height:75vh;
}
.route-panel {
  position: absolute;
  top: 29%;
  left: 33%;
  width: 290px;
  max-height: 400px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 16px;
  z-index: 10000;
  font-size: 14px;
  cursor: move;
}
</style>