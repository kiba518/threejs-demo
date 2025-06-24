import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'

const app = createApp(App)

// 注册所有 Element Plus 图标（或按需注册）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
