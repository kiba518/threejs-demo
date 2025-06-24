// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

import ViewsRouter from './views/' // 页面路由

const routes = [
    { path: '/', redirect: '/school'},
    ...ViewsRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
