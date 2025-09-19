import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import { VueUiRadar } from "vue-data-ui"
const app = createApp(App)
app.component("VueUiRadar", VueUiRadar)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(createPinia())
app.mount('#app')