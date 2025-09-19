<template>
  <header class="header">
    <el-row class="header-row" type="flex" justify="space-between" align="middle">
      <!-- 左侧：项目名称和logo -->
      <el-col :span="5">
        <div class="logo">
          <span class="project-time">{{ currentTime }}</span>
          <span class="project-time">
          <span class="project-weather">宜宾市当前天气状况：</span>
          {{ currentWeather }}
        </span>
        </div>
      </el-col>

      <!-- 中间偏右：搜索框和图标 -->
      <el-col :span="10" class="search-section">
        <el-input
            v-model="input"
            class="search-input"
            placeholder="请输入你想了解的村落"
            style="margin-left: 50px;margin-top: 10px"
        />
        <el-button size="large" round @click="search">查找</el-button>
      </el-col>

      <!-- 右侧：导航菜单和用户信息 -->
      <el-col :span="9">
        <div class="right-section">
          <el-menu
              class="nav-menu"
              mode="horizontal"
              background-color="transparent"
              active-text-color="#ffffff"
          >
            <el-menu-item index="0" @click="main"><u>首页</u></el-menu-item>
            <el-menu-item index="1" @click="Sideinfo"><u>村落概览</u></el-menu-item>
            <el-menu-item index="2" @click="Sidehistory"><u>历史文化</u></el-menu-item>
            <el-menu-item index="3" @click="ecnomic"><u>当地经济</u></el-menu-item>
          </el-menu>
            <div class="user-avatar-wrapper">
              <el-avatar  :src="userAvatar || ''"  @click="drawer2 = true"/>
              <span class="user-name" style="margin-top: 8px">{{ userName || '未登录' }}</span>
            </div>
          <button class="userOption" STYLE="margin-top: 15px" @click="logout">退出登录</button>
        </div>
      </el-col>
    </el-row>
  </header>
  <div v-if="searchResults.length > 0" class="search-results">
    <div class="table-header">
      <div class="header-buttons">
        <el-button type="text" @click="closeSearchResults">关闭</el-button>
        <div class="pagination">
          <el-button :disabled="currentPage === 1" @click="currentPage--">上一页</el-button>
          <el-button :disabled="currentPage * pageSize >= searchResults.length" @click="currentPage++">下一页</el-button>
        </div>
      </div>
    </div>
    <el-table :data="getPagedResults()">
      <el-table-column label="村落名称" prop="village_name">
        <template #default="scope">
        <span @click="go(scope.row.village_name)" style="cursor: pointer; color: blue;">
          {{ scope.row.village_name }}
        </span>
        </template>
      </el-table-column>
      <el-table-column label="村落起源" prop="origin"></el-table-column>
    </el-table>
  </div>
<!--个人主页信息-->
  <el-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>个人基本信息</h4>
    </template>
    <template #default>
      <div>
        <div style="display: flex; align-items: center; justify-content: center;">
          <div style="margin-right: 30%;" class="userName">用户名：{{ userName }}</div>
          <br>
          <br>
          <el-avatar  :src="userAvatar || ''"  :size="100" @click="drawer2 = true"/>
        </div>
          <div class="basicInfo">地址：{{ userAdress }}</div>
          <div class="basicInfo">电话：{{ userPhone }}</div>
          <div class="basicInfo">邮箱：{{ userEmail }}</div>
        <div class="basicInfo">
          性别：{{ userSex === '0' ? '男' : userSex === '1' ? '女' : '其他' }}
        </div>
          <div class="basicInfo">年龄：{{ userAge }}</div>
        <div class="basicInfo">生日：{{ formatBirthday(userBirthday) }}</div>
          <div class="basicInfo">爱好：{{ userFavor }}</div>
        <el-button  @click="editInfo" type="primary" style="background-color: #5dc2fe;margin-left: 40%;margin-top: 50px">编辑个人信息</el-button>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
      </div>
    </template>
  </el-drawer>
  <el-dialog title="编辑个人信息" width="40%" v-model="dialogFlag">
    <el-form :model="userInfoForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfoForm.userName" disabled />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="userInfoForm.userAdress" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userInfoForm.userPhone" placeholder="请输入电话" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfoForm.userEmail" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userInfoForm.userSex" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
          <el-option label="其他" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="userInfoForm.userAge" :min="0" :max="120" />
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="userInfoForm.userBirthday"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="爱好">
        <el-input
            v-model="userInfoForm.userFavor"
            type="textarea"
            placeholder="请输入您的爱好"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFlag = false">取消</el-button>
      <el-button type="primary" @click="saveUserInfo">保存</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { useGlobalStore } from '../stores/globalStore';
import { storeToRefs } from 'pinia'
import {defineComponent, onMounted} from 'vue';
import { ref } from 'vue';
import { onBeforeUnmount } from 'vue';
import router from '../router';
import axios from 'axios'; // 引入 axios
import {DrawerProps, ElMessage} from "element-plus";
import side from "../components/side.vue";
export default defineComponent({
  name: 'Header',
  computed: {
    side() {
      return side
    }
  },
  setup() {
    const dialogFlag = ref(false)
    const drawer2 = ref(false)
    const direction = ref<DrawerProps['direction']>('rtl')
    const userName=ref()
    const userAvatar=ref()
    const userAdress=ref()
    const userPhone=ref()
    const userEmail=ref()
    const userSex=ref()
    const userAge=ref()
    const userBirthday=ref()
    const userFavor=ref()
    const{flag}=storeToRefs(useGlobalStore())
    const currentPage = ref(1); // 当前页数
    const pageSize = 5; // 每页显示的条数
    const currentTime = ref('');
    const currentWeather = ref('');
    const input = ref('');
    const searchResults = ref([]); // 用于存储查询结果
    const userInfoForm = ref({
      userName:localStorage.getItem('user'),
      userAdress: '',
      userPhone: '',
      userEmail: '',
      userSex: '2',
      userAge: '',
      userBirthday: '',
      userFavor: '',
    });
    const safeGet = (key: string, fallback: string = '暂无信息') => {
      const val = localStorage.getItem(key)
      return val && val !== 'null' ? val : fallback
    }

    const getUserInfo = () => {
      userName.value = safeGet('user', '未登录')
      userAvatar.value = safeGet('avatar', '') // 头像为空字符串防止 img src 报错
      userAdress.value = safeGet('adress')
      userPhone.value = safeGet('phone')
      userEmail.value = safeGet('email')
      userSex.value = safeGet('sex')
      userAge.value = safeGet('age')
      userBirthday.value = safeGet('birthday')
      userFavor.value = safeGet('favor')
    }

    const updateCurrentTime = () => {
      const now = new Date();
      const year = now.getFullYear() + "年";
      const month = (now.getMonth() + 1).toString().padStart(2, '0') + "月"; // 月份从0开始，所以加1
      const day = now.getDate().toString().padStart(2, '0') + "日";
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
   const weather=()=>{
     axios.get('https://api.seniverse.com/v3/weather/now.json?key=S5ENVBqmHom1nt9hg&location=yibin&language=zh-Hans&unit=c', {
      params: { query: null } // 将输入的搜索内容作为查询参数
    }).then(response => {
      console.log(response.data)
       currentWeather.value=response.data.results[0].now.temperature+"°C"+"\t"+response.data.results[0].now.text;
    }).catch(error => {
      console.error("获取数据时出错:", error);
    });
    }
    onMounted(() => {
      if (!localStorage.getItem('user')){
        ElMessage.error({
          message: '无权操作，请先登录！',
          type: 'error',
          plain: true,
        });
        router.push('/');
      }
      getUserInfo()
    });

    // 初始化时更新时间
    updateCurrentTime();
    weather();
    // 每秒钟更新一次时间
    const intervalId = setInterval(updateCurrentTime, 1000);
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
    const Sideinfo = () => {
      // 当前路由名称为根路由不跳转
      if (router.currentRoute.value.name === 'main')
        ElMessage({
          message: '请先选择一个村落在进行操作！',
          type: 'error',
          plain: true,
        }); // 假设根路由的名称为 'Home'
      // 0.5 秒后跳转
     else if (router.currentRoute.value.name === 'sideinfo')
      ElMessage({
        message: '已经是村落概览了！',
        type: 'error',
        plain: true,
      });
      else
      setTimeout(() => {
        router.push('/sideinfo'); // 使用 router 对象进行跳转
      }, 300);
    };

    const main = () => {
      if (router.currentRoute.value.name === 'main')
        ElMessage({
        message: '已经是首页了！',
        type: 'error',
        plain: true,
      }); // // 假设根路由的名称为 'Home'

     else
       router.push('/main');
     flag.value=true;
    };
    const Sidehistory=()=>{
      if (router.currentRoute.value.name === 'main')  ElMessage({
        message: '请先选择一个村落在进行操作！',
        type: 'error',
        plain: true,
      }); // // 假设根路由的名称为 'Home'
   else if (router.currentRoute.value.name === 'sidehistory')
      ElMessage({
        message: '已经是历史文化面了！',
        type: 'error',
        plain: true,
      });
    else
      router.push('/sidehistory');
    }
    const ecnomic=()=>{
      if (router.currentRoute.value.name === 'main')  // 假设根路由的名称为 'Home'
      ElMessage({
        message: '请先选择一个村落在进行操作！',
        type: 'error',
        plain: true,
      }); //
      else if (router.currentRoute.value.name === 'ecnomic')
      ElMessage({
        message: '已经是当地经济页面了！',
        type: 'error',
        plain: true,
      });
      else
        router.push('/ecnomic')
    }
    const search = async () => {
      try {
        if(!input.value){
          ElMessage({
            message: '请输入村落名称',
            type: 'warning',
            plain: true,
          });
          return;
        }
        const response = await axios.get('http://106.53.189.150:3000/search', {
          params: { query: input.value } // 将输入的搜索内容作为查询参数
        });
        searchResults.value = response.data; // 将查询结果存储到 searchResults
        console.log(searchResults.value)
        if (searchResults.value.length === 0) {
          ElMessage({
            message: '没有匹配的村落哦',
            type: 'warning',
            plain: true,
          });
        }
      } catch (error) {
        ElMessage.error('查询失败');
      }
    };
    const getPagedResults = () => {
      const startIndex = (currentPage.value - 1) * pageSize;
      return searchResults.value.slice(startIndex, startIndex + pageSize);
    };
    const closeSearchResults = () => {
      searchResults.value = [];
    };
    const go = (villageName: string) => {
      localStorage.setItem('side', villageName);
      setTimeout(() => {
        router.push('/side');
      }, 100);
    };
    //退出登录
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userid')
      localStorage.removeItem('birthday')
      localStorage.removeItem('adress')
      localStorage.removeItem('phone')
      localStorage.removeItem('favor')
      localStorage.removeItem('email')
      localStorage.removeItem('age')
      localStorage.removeItem('sex')
      userName.value = null
      userAvatar.value = null
      ElMessage({
        message: '已退出登录',
        type: 'success',
        plain: true,
        duration:500,
      });
     setTimeout(() => {
      router.push('/');
    }, 400);
    }
    const saveUserInfo = async () => {
      // 这里添加保存逻辑，例如调用API
      console.log('保存的用户信息:', userInfoForm.value);
      const response = await axios.post('http://106.53.189.150:3000/updateuser', userInfoForm.value);
      ElMessage.success(response.data.message)
      localStorage.setItem('adress',response.data.user.userAdress)
      localStorage.setItem('phone',response.data.user.userPhone)
      localStorage.setItem('birthday',response.data.user.userBirthday)
      localStorage.setItem('favor',response.data.user.userFavor)
      localStorage.setItem('email',response.data.user.userEmail)
      localStorage.setItem('age',response.data.user.userAge)
      localStorage.setItem('sex',response.data.user.userSex)
      getUserInfo()
      dialogFlag.value = false;
    };
    function formatBirthday(dateStr:any) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}年${mm}月${dd}日`;
    }
    function editInfo(){
      userInfoForm.value = {
        userName: userName.value,
        userEmail: userEmail.value,
        userAdress: userAdress.value,
        userAge: userAge.value,
        userSex: userSex.value,
        userFavor: userFavor.value,
        userPhone: userPhone.value,
        userBirthday: userBirthday.value,
      }
      dialogFlag.value = true;
    }
    return {
      editInfo,
      formatBirthday,
      saveUserInfo,
      userInfoForm,
      dialogFlag,
      userEmail,
      userAdress,
      userAge,
      userSex,
      userFavor,
      userAvatar,
      userPhone,
      userBirthday,
      direction,
      drawer2,
      userName,
      currentWeather,
      weather,
      currentTime,
      input,
      Sideinfo,
      Sidehistory,
      ecnomic,
      main,
      search,
      searchResults,
      closeSearchResults,
      getPagedResults,
      currentPage,
      pageSize,
      updateCurrentTime,
      go,
      logout,
    };
  },
});
</script>
<style scoped>
  .header {
    background-color: rgb(221, 241, 234);
    width: 100vw;
    height: 80px;
    position: absolute;
    right: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
    font-family: "Microsoft YaHei", sans-serif;
    font-style: normal;
    font-size: 20px;
  }

  .header-row {
    padding: 0 20px;
  }

  .logo {
    display: flex;
    align-items: center;
  }
  .project-time{
    margin-top: 10px;
    color: black;
    font-family: "Microsoft YaHei", sans-serif;
    margin-left: 20px;
    font-size: 12px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-weight: bold;
  }

  .search-section .search-input {
    width: 100%;
    max-width: 300px;
    border-radius: 4px; /* 圆角效果 */
  }

  .search-section .el-input__inner {
    border-radius: 4px; /* 统一圆角 */
    padding-right: 40px; /* 为图标留空间 */
  }
  .el-button {
    margin-left: 30px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgb(246, 236, 204);
    height: 35px;
  }
  .el-button:hover {
    background-color: rgb(172, 231, 159);
    color: #8e4646;
  }

.right-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 15px; /* 减小菜单与用户头像的间距（原间距过大，挤压菜单宽度） */
  }

  .nav-menu {
    flex: 1;
    margin-top: 10px;
    margin-left: -80px;
    border-bottom: none;
    --el-menu-overflow-max-width: none !important; /* 取消溢出宽度限制 */
    overflow-x: visible !important; /* 横向溢出时不隐藏 */
  }

  .nav-menu .el-menu-item {
    font-size: 16px;
    font-weight: 500;
    color: #000000; /* 黑色字体 */
    padding: 0 18px !important;
    margin: 0 !important;
    white-space: nowrap;
  }

  .nav-menu .el-menu-item:hover {
    background-color: rgb(187, 227, 180); /* 悬停时菜单项背景色 */
    color: #8e4646; /* 悬停时字体颜色保持黑色 */
  }
  .search-results {
    width: 21%;
    margin-top: 50px;
    margin-left: 30%;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    position: fixed;
    z-index: 99;
    max-height: 200px;
  }
  .table-header {
    display: flex;
    justify-content: space-between;  /* 确保按钮在两端 */
    align-items: center;  /* 垂直居中 */
    padding: 10px;
  }

  .header-buttons {
    display: flex;
    align-items: center;  /* 垂直居中按钮 */
  }

  .pagination {
    margin-left: 10px;
    display: flex;
    align-items: center;
    gap: 10px;  /* 按钮之间的间距 */
  }

.right-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 0px; /* 大幅减小菜单与用户头像的间距（原可能20px+，挤压菜单） */
    padding-left: 10px; /* 给菜单左侧留少量空间，避免贴边 */
  }


  .user-avatar-wrapper {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-top: 0px;
  }
  .user-name {
    margin-left: 10px;
    color: black;
    font-weight: bold;
    font-size: 15px;
  }
  .userOption {
    margin-left: 10px;
    color: black;
    font-size: 15px;
    border: none;
    background-color: transparent;
    font-family: "Microsoft YaHei", sans-serif;
    cursor: pointer; /* 鼠标悬浮时显示“手”形状，提示可点击 */
    transition: color 0.3s ease;
  }

.userOption:hover {
  color:red; /* 悬浮时文字和箭头变为橙色（可自定义色值） */
}

  .userName {
    margin-left: 10px;
    color: #9ce4ff;
    font-weight: bold;
    font-size: 20px;
    font-family: "Microsoft YaHei", sans-serif;
  }
  .basicInfo {
    margin-top: 22px;
    margin-left: 10px;
    color: #d87c7c;
    font-weight: bold;
    font-size: 23px;
    font-family: "Noto Sans SC", sans-serif;
  }
  </style>
  