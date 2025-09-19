<script setup lang="ts">
import Header from "../view/header.vue";
import {onMounted, ref} from "vue";
import router from "../router";
import {Edit} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";
const flag = ref(true)
let culback=localStorage.getItem('culback');
let localcharacter=localStorage.getItem('localcharacter');
let culimg :any=localStorage.getItem('sideimg');
let sidevideo :any=localStorage.getItem('sidevideo');
let featvideo :any=localStorage.getItem('featvideo');
const commentFlag= ref(false)
const goside = () => {
  setTimeout(() => {
    router.push({
      path: '/side',
    })
  }, 400)

}
const writeComment = () => {
commentFlag.value=true
}
//发表评论
const commentEntity= ref({
  villageName: localStorage.getItem('side'),
  userName: localStorage.getItem('user'),
  address: localStorage.getItem('adress'),
  content: '',
  date: '',
})
const handleAddComment = async () => {
  if (!commentEntity.value.content) {
    ElMessage.error('评论内容不能为空');
    return
  }
  commentEntity.value.date = new Date().toLocaleString();
  const res = await axios.post('http://106.53.189.150:3000/addcomment', commentEntity.value)
  ElMessage.success(res.data)
  commentEntity.value.content = '';
  commentFlag.value = false
  getcomments()
}
//获取评论
const comments :any= ref([])
const getcomments = async () => {
  const res = await axios.get('http://106.53.189.150:3000/getcomment', {
    params: {
      villageName: localStorage.getItem('side'),
    }
  })
  comments.value = res.data
}
const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}

onMounted(() => {
  getcomments()
})
</script>
<template>
<div class="app-container">
  <Header></Header>
  <div class="body">
    <div class="heade">
    </div>
    <div class="change">
      <el-button @click="flag=true">图文展示</el-button>
      <br>
      <el-button @click="flag=false">视频展示</el-button>
    </div>
    <button @click="goside" class="routebutton">路线规划</button>
    <div class="content">
      <!-- 第一部分：文化背景 -->
      <div class="section">
        <div class="text-content">
          <h2>文化背景</h2>
          <p>{{ culback }}</p>
        </div>
        <div class="media-content">
          <img v-if="flag" :src="culimg" alt="文化背景图">
          <iframe v-else :src="sidevideo" title="文化背景视频" allowfullscreen></iframe>
        </div>
      </div>

      <!-- 第二部分：当地特色 -->
      <div class="section">
        <div class="text-content">
          <h2>当地特色</h2>
          <p>{{ localcharacter }}</p>
        </div>
        <div class="media-content">
          <img v-if="flag" src="https://tse3-mm.cn.bing.net/th/id/OIP-C.G7IzhIfmzXcn1ha0u3BHGwHaE4?w=259&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="当地特色图">
          <iframe v-else :src="featvideo" title="当地特色视频" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div class="comment-section">
      <h2>评论区</h2>
      <div class="comment-list">
        <div class="comment-item" v-for="(item, index) in comments" :key="index">
          <p>
             <strong>{{ item.address }}</strong> 的
            <strong>{{ item.user_name }}</strong>  于
            <strong>{{ formatDate(item.date) }}</strong> 发表：
          </p>
          <p id="comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content }}</p>
        </div>
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
        @click="writeComment"
        style="position: fixed; bottom: 180px; right: 30px; z-index: 1000; font-size: 20px;"
    />
  </el-tooltip>
  <el-dialog title="发表评论" width="40%" v-model="commentFlag" style="margin-top: 20%">
    <el-form>
      <el-form-item label="评论">
        <el-input type="textarea" v-model="commentEntity.content"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleAddComment" :size="100">发表</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@900&family=ZCOOL+KuaiLe&family=ZCOOL+XiaoWei&family=Zhi+Mang+Xing&display=swap');
* {
  margin: 0;
  padding: 0;
}
.app-container {
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background:transparent;
}
.body {
  margin-top: 100px;
}
.heade{
  background: url(/img/header.jpg  )no-repeat center center;
  background-size: cover;
  width: 100vw;
  height: 300px;
  position: relative;
}
.change {
  background-color: rgba(255,255,255,0.5);
  width: auto;
  height: auto;
  right: 15px;
  bottom: 100px;
  position: fixed;
  z-index: 5;
  border: #4CAF50 solid 2px;
  border-radius: 18px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px 5%;
  background-color: transparent;
}

.section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  gap: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.6s ease-in;
}
.section:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.25);
}
.text-content {
  flex: 1;
}

.text-content h2 {
  font-family: "ZCOOL KuaiLe", sans-serif;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  border-left: 5px solid #4CAF50;
  padding-left: 10px;
}

.text-content p {
  line-height: 1.8;
  font-family: "Noto Sans SC", sans-serif;
  font-size: 1.25rem;
  color: #444;
  text-align: justify;
}

.media-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-content img,
.media-content iframe {
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
}
.media-content img{
  width: 100%;
}
.media-content iframe{
  width: 350px;
}
/* 响应式适配：手机端变为上下排列 */
@media screen and (max-width: 768px) {
  .section {
    flex-direction: column;
    align-items: center;
  }

  .media-content img,
  .media-content iframe {
    width: 100%;
    height: auto;
  }
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.routebutton{
  background-color: rgba(120, 214, 70, 0.5);
  width: 60px;
  height: 40px;
  left: 15px;
  top: 50%;
  position: fixed;
  z-index: 5;
}
.comment-section {
  padding: 20px;
  background: rgb(253, 253, 253, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 95vw;
  margin-left: auto;
  margin-right: auto;
  min-height: 300px;
  max-height: 300px;
}
.comment-list {
  max-height: 240px;
  overflow-y: auto;
  padding-right: 10px;

  /* 隐藏滚动条但保留滚动功能（Webkit 浏览器） */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.comment-list::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
.comment-item {
  padding: 12px;
  background: rgb(216, 208, 192,0.2);
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #c1b72e;
}
#comment{
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1rem;
  color: #1b0f0f;
  text-align: justify;
  font-weight: bold;
}
</style>