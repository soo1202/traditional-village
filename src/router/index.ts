// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Side from '../components/side.vue';
import Main from '../components/main.vue';
import SideInfo from '../components/sideinfo.vue';
import Sidehistory from "../components/sidehistory.vue";
import Ecnomic from "../components/ecnomic.vue";
import Login from "../components/login.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
    {
    path: '/main', // 修改这里
    name: 'main',
    component: Main
  },
  {
    path: '/sideinfo', // 修改这里
    name: 'sideinfo',
    component: SideInfo
  },
  {
    path: '/side', // 修改这里
    name: 'side',
    component: Side
  },
    {
    path: '/sidehistory', // 修改这里
    name: 'sidehistory',
    component: Sidehistory
  },
    {
    path: '/ecnomic', // 修改这里
    name: 'ecnomic',
    component: Ecnomic
  },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),  // 使用 VITE_ 前缀的环境变量
    routes
  });

export default router;