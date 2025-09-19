<script lang="ts" >
import {Ref, ref} from 'vue'
import router from '../router';
import { onMounted } from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "QuarterScreenComponent",
  setup() {
    const searchResults :Ref<any>= ref([]);
    const currentPage = ref(1); // 当前页
    const pageSize = 4; // 每页显示的数量

    onMounted(async () => {
      // 从数据库中读取信息
      try {
        const response = await axios.get('http://106.53.189.150:3000/village_name', {
          params: { query: null } // 将输入的搜索内容作为查询参数
        });
        searchResults.value = response.data;
        console.log(searchResults.value)
      } catch (error) {
        console.error("获取数据时出错:", error);
      }
    });
    const getPagedResults = () => {
      const startIndex = (currentPage.value - 1) * pageSize;
      return searchResults.value.slice(startIndex, startIndex + pageSize);
    };
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
      if(currentPage.value==1){
        ElMessage({
          message: '这就是第一页！，没有上一页了！',
          type: 'warning',
          plain: true,
        }); //
      }
    };
    // 下一页
    const nextPage = () => {
      if (currentPage.value * pageSize < searchResults.value.length) {
        currentPage.value++;
      }
      if(currentPage.value==Math.ceil(searchResults.value.length/pageSize)){
        ElMessage({
          message: '这就是最后一页！，没有下一页了！',
          type: 'warning',
          plain: true,
        }); //
      }
    };
    const go = (villageName: string) => {
      localStorage.setItem('side', villageName);
      setTimeout(() => {
        router.push('/side');
      }, 100);
    };
    const showwait = () => {
      ElMessage({
        message: '敬请期待！',
        type: 'warning',
        plain: true,
      }); //
    }
      return {
       go,getPagedResults,prevPage,nextPage,showwait
      }
  }
}
</script>
<template>
  <div class="quarter-screen">
    <h3>村落先览</h3>
    <div class="area">
      <el-button type="primary" round @click="showwait">⬅️</el-button>
      <p class="provience">宜宾市</p>
      <el-button type="success" round @click="showwait">➡️</el-button>
    </div>
    <ul>
      <li v-for="(village, index) in getPagedResults()" :key="index">
        <div class="el-card" shadow="always" @click="go(village.village_name)">
          <img v-if="index % 4 === 0" src="/img/cl.png" alt="">
          <img v-if="index % 4 === 1" src="/img/cl.jpg" alt="">
          <img v-if="index % 4 === 2" src="/img/cl2jpg.jpg" alt="">
          <img v-if="index % 4 === 3" src="/img/R-C.jpg" alt="">
          <p class="descripution">四川省</p>
          <p class="sidename">{{ village.village_name }}</p>
        </div>
      </li>
    </ul>
    <div class="footer">
      <button class="fotterbtn" @click="prevPage"><</button>
      <button class="fotterbtn" @click="nextPage">></button>
    </div>
  </div>
</template>

<style lang="css" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.quarter-screen {
  padding: 0;
  left: 0;
  width: 20vw; 
  height: 100vh; 
  background-color: transparent;
  margin-top: 85px;
  box-shadow: 1px 1px 5px #b79c9c;
}
h3 {
  font-size: 1.5rem;
  margin-left: 3%;
  font-style: italic; /* 字体倾斜 */
  text-shadow: 2px 2px 4px #000000;
  color: #e0d3d3;
}
.area{
  display: flex;
  justify-content: space-between;
  height: 10vh;
}
.el-button{
  margin-top: 30px;
  width: 60px;
  margin-left: 20px;
  margin-right: 25px;
  background-color: transparent;
}
.el-button:hover{
  background-color: rgb(239, 214, 214);
}
.el-button:active{
  background-color: aquamarine;
}
.provience{
  margin-top: 30px;
  font-size: 1.3rem;
  color: #1b0f0f;
}
ul{
  list-style: none;
  width: 100%;
  height: 70vh;
}
li{
  margin-top: 2.5vh;
  width: 18VW;
  height: 15vh;
  margin-left: 7%;
  background-color: transparent;
  padding-top: 10px;
}
img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;  
}
.descripution {
  margin-top: 15px;
  font-size: 1.5rem;
  margin-left: 5px;
  position: relative;
  font-family: "Liu Jian Mao Cao", cursive ;
  color: rgb(253, 253, 253);
  font-weight: bold;
  z-index: 1; 
 }
.sidename {
  margin-top: 15px;
  font-size: 15px;
  margin-left: 5px;
  position: relative;
  color: whitesmoke;
  font-family: "Ma Shan Zheng", serif;
  font-weight: bold;
  z-index: 1;
}
.el-card{
  background-color: transparent;
  width: 90%;
  height: 90%;
  position: relative;
}
.el-card:hover {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 10px #000000;
  padding: 0;
  width: 100%;
  height: 100%;
  .descripution {
    color: #ff6347;
    text-shadow: 1px 1px 2px #dfbfbf;
    font-size: 1.6rem;
  }
  .sidename {
    color: #fbfbfb;
    font-size: 20px;
  }
 }
 .footer {
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  height: 10vh;       
 }
.fotterbtn {
  margin-bottom: 5px;
  margin-left: 20px;
  margin-right: 40px;
  width: 30px;
  height: 30px;
  background-color: blanchedalmond;
}
.fotterbtn:active {
  background-color: transparent;
}
</style>