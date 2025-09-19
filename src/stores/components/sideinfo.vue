<template>
  <div class="sideinfo">
   <el-carousel height="100vh" motion-blur interval="4000">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="image.alt" class="carousel-image" />
    </el-carousel-item>
  </el-carousel>
  <Header style="background-color: rgba(255, 255, 255, 0.6)" />
  <div class="info">
  <div class="sidename">
    <h1>四川省</h1>
      <p>{{sidename}}</P>
  </div>
  <button class="open" @click="contentflag = true" v-if="!contentflag">展开</button>
  <div class="content" v-if="contentflag">
    <button class="close" @click="contentflag = false">隐藏</button>
    <br>
    <button @click="goside" class="close2">路线规划</button>
    <br>
    <div>
      <span>地理环境信息:</span>
      <br>
      <p class="geoinfo">{{geoinfotext}}</p>
    </div>
    <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.eaWHgVsvp_jiWR2wsujvmQHaE2?w=227&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
    <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.YN9E3By3XdmBqYa9P1Ps_AHaE7?w=256&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
    <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.wFkXNh1qORK21mtN36_B0gHaEd?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
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
<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../view/header.vue';
import { ref } from 'vue'
import {Close, Edit} from "@element-plus/icons-vue";
import router from "../router";
export default defineComponent({
  name: 'sideinfo',
  methods: {
    router() {
      return router
    }
  },
  computed: {
    Edit() {
      return Edit
    },
    Close() {
      return Close
    }
  },
  components: {
      Header
    },
  setup() {
    const  goSidehistory=()=>{
      router.push({
        path: '/sidehistory',
      })
    }
    let sidename=localStorage.getItem('side');
    let geoinfo=localStorage.getItem('geoinfo');
    let contentflag = ref(true)
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
    const start= ref('');
    const startplace = ref('');
    const routeData: any = ref([]);
const geoinfotext = ref('');
    let index = 0;
    const typeWriter = () => {
      if (geoinfo)
      if (index < geoinfo.length) {
        geoinfotext.value += geoinfo[index];
        index++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
    const goside = () => {
      setTimeout(() => {
        router.push({
          path: '/side',
        })
      }, 400)

    }
    return {
      goSidehistory,
      goside,
      geoinfotext,
      start,
      routeData,
      startplace,
      geoinfo,
      sidename,
      images,
      contentflag
    } }
})
</script>
<style lang="css" scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.sideinfo{
    width: 100%;
    height: 100vh;
}
.carousel-image{
  width: 100%;
  height: 100%;
}
.info{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100vw;
  height: 70vh;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
}
.sidename{
  display: flex;
  justify-content: center;
  height: max-content;
  writing-mode: vertical-rl;/*字体垂直显示*/
  font-size: 35px;
  margin-bottom: 20px;
  color: #fff;
  background-color: #c6a477;
}
.content{
  width: 90%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  margin-left: 20px;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
}
.close{
  position: absolute;
  right: 4%;
  top: 10px;
  background-color: #c6a477;
  width: 60px;
  height: 40px;
}
.close2{
  position: absolute;
  right: 4%;
  top: 60px;
  background-color: #568841;
  width: 60px;
  height: 40px;
  color: white;
}
.open{
  margin-top: 2%;
  width: 60px;
  height: 40px;
  background-color: #d69238;
}
.content p{
  margin-top: 20px;
  text-indent: 2em;
  line-height: 1.5;
  font-size: 20px;

}
span{
  font-size: 25px;
  font-weight: bold;
}
.geoinfo{
  font-size: 25px;
  text-indent: 2em;
  line-height: 1.5;
  font-family: "ZCOOL XiaoWei", sans-serif;
  font-weight: 300;
}
.content img{
  width: 31%;
 height: 400px;
 margin-left: 2%;
  margin-top: 20px;
}



</style>