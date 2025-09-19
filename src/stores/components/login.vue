<template >
  <div class="login-container">
    <el-card class="login-card" >
      <div class="login-title">传统村落可视化平台</div>
      <!-- 选项卡切换 -->
      <el-tabs v-model="activeTab">
        <el-tab-pane label="登录" name="login">
          <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              label-width="80px"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                  show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="register">
          <el-form
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              label-width="80px"
          >
            <div v-if="activeTab === 'register'" style="display: flex;">
            <el-form-item label="用户头像" prop="avatar">
              <el-select v-model="registerForm.avatar" placeholder="请选择头像" style="width: 100px;">
                <el-option
                    v-for="item in avatarOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                  <div style="display: flex; align-items: center;">
                    <img :src="item.value" style="width: 40px; height: 40px; margin-right: 10px;" />
                    {{ item.label}}
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预览">
              <img v-if="registerForm.avatar" :src="registerForm.avatar" style="width: 100%;" />
            </el-form-item>
          </div>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="registerForm.userName" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                  show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  clearable
                  show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRegister" style="width: 100%;">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue'
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "../router";

// 定义表单验证规则类型
interface FormRules {
  [key: string]: Array<{ required?: boolean; message?: string; trigger?: string | Array<string>; min?: number; max?: number; type?: string; validator?: Function }>
}
//用户头像选择  const projectList = ref<Array<{ value: string; label: string }>>([]);
const avatarOption=ref<Array<{value:string;label:string}>>([ {value:'/img/avatar1.svg',label:'头像男'},{value:'/img/avatar2.svg',label:'头像女'},{value:'https://api.dicebear.com/9.x/avataaars-neutral/svg',label:'头像男2'},{value:'https://api.dicebear.com/9.x/big-smile/svg',label:'头像女2'},])
// 登录表单数据
const loginForm = reactive<{ userName: string; password: string }>({
  userName: '',
  password: ''
})

// 注册表单数据
const registerForm = reactive<{
  userName: string;
  password: string;
  confirmPassword: string;
  avatar:any;
}>({
  userName: '',
  password: '',
  confirmPassword: '',
  avatar:''
})

// 登录验证规则
const loginRules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3到20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度应在6到16个字符之间', trigger: 'blur' }
  ]
})

// 注册验证规则
const registerRules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3到20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度应在6到16个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
          console.log(rule)
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
})
const resetForm=()=>{
  registerForm.userName=''
  registerForm.password=''
  registerForm.confirmPassword=''
  registerForm.avatar=''
  loginForm.userName=''
  loginForm.password=''
}
// 当前活动选项卡
const activeTab = ref<'login' | 'register'>('login')

//     表单引用
const loginFormRef = ref<HTMLFormElement | null>(null)
const registerFormRef = ref<HTMLFormElement | null>(null)

// 登录请求
const handleLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) try {
      const res = await axios.post('http://106.53.189.150:3000/login', loginForm)
      ElMessage.success({
        message: '登录成功,即将前往首页',
        duration: 900, // 0.5秒 = 500毫秒
      })
      setTimeout(() => {
        router.push('/main');
      }, 1000)
      localStorage.setItem('user', res.data[0].userName)
      localStorage.setItem('avatar', res.data[0].userIcon)
      localStorage.setItem('userid', res.data[0].id)
      localStorage.setItem('phone', res.data[0].userPhone)
      localStorage.setItem('email', res.data[0].userEmail)
      localStorage.setItem('adress', res.data[0].userAdress)
      localStorage.setItem('birthday', res.data[0].userBirthday)
      localStorage.setItem('favor', res.data[0].userFavor)
      localStorage.setItem('sex', res.data[0].userSex)
      localStorage.setItem('age', res.data[0].userAge)
    }
    catch (error: any) {
      ElMessage.error(error.response.data)
      resetForm()
    }
}
)
}
// 注册请求
const handleRegister =  () => {
  registerFormRef.value?.validate(async (valid: boolean) => {
    if (valid) try {
      const res = await axios.post('http://106.53.189.150:3000/adduser', registerForm)
      ElMessage.success(res.data+',请前往登录')
      console.log(res)
      resetForm()
      activeTab.value = 'login'
    } catch (error: any) {
      ElMessage.error(error.response.data)
      resetForm()
    }
  })
}
watch(activeTab, (newValue) => {
  console.log(newValue)
  resetForm()
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/img/bg.jpg'); /* 设置背景图片 */
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 居中显示 */
}
.login-card {
  width: 400px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.6); /* 添加白色半透明背景 */
}
:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
  font-weight: bold;
}
:deep(.el-tabs__active-bar) {
  background-color: var(--el-color-primary);
}
.login-title {
  font-family: "ZCOOL KuaiLe", sans-serif;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #878131; /* 使用Element Plus的主题色 */
}
</style>