<template>
  <el-container style="height: 100vh;">
    <!-- Header -->
    <el-header class="app-header">
      <h1>Physics EDU</h1>
    </el-header>

    <!-- 主体区域 -->
    <el-container>
      <!-- 可折叠侧边栏 -->
      <el-aside v-if="!isCollapsed" width="280px" class="sidebar">
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p v-html="slide.text"></p>
        </div>

        <div class="nav-buttons">
          <el-button @click="prevSlide" :disabled="currentIndex === 0">上一页</el-button>
          <el-button type="primary" @click="nextSlide" :disabled="currentIndex === slides.length - 1">下一页</el-button>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="viewer-container">
        <component :is="currentComponent" style="height: 100%;" />

        <!-- 折叠/展开按钮 -->
        <div class="collapse-toggle" @click="isCollapsed = !isCollapsed">
          <el-icon size="20">
            <component :is="isCollapsed ? Expand : Fold" />
          </el-icon>
        </div>
      </el-main>
    </el-container>

    <!-- Footer -->
    <el-footer class="app-footer">
      © 2025 {{readonlyName}} - Powered by XYZ Education Ltd. 联系电话：{{readonlyPhone}}
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import HDRViewer from '@/components/three/HDRViewer.vue'
import { useStore } from 'vuex'

const store = useStore()

const readonlyName = computed(() => store.state.name) //定义一个响应式变量，就是同时改变值的，computed实际上是创建了一个mvvm模式的变量。但他是一个单向绑定的，就是store改了他才变，他本身是只读的。
const readonlyPhone = computed(() => store.state.phone)

// console.log("store.state.name",store.state.name)
// console.log("store.state.fullName",store.getters.fullName)
// store.commit('setName',"李四")
// console.log("setName 李四 了")
// console.log("store.state.name",store.state.name)
// console.log("store.state.fullName",store.getters.fullName)
// store.dispatch('asyncUpdatePhone',"1555555")
// console.log("asyncUpdatePhone 1555555 了")
// console.log("store.state.name",store.state.name)
// console.log("store.state.fullName",store.getters.fullName)
//
// setTimeout(() => {
//   console.log("2秒后了了")
//   console.log("store.state.name",store.state.name)
//   console.log("store.state.fullName",store.getters.fullName)
// }, 2000)


const slides = [
  {
    title: "1. 光的折射定义",
    text: "当光从一种介质斜射入另一种介质时，传播方向会发生改变，这就是光的折射现象。"
  },
  {
    title: "2. 折射定律",
    text: "折射率（n）是光在两种介质中传播速度比值的常数，它影响着光线在界面上的偏折程度。<br>折射率越大，光线偏折的程度就越大。"
  },
  {
    title: "3. 折射定律的公式",
    text: "n₁sinθ₁ = n₂sinθ₂<br>其中 n₁ 和 n₂ 分别是两种介质的折射率，θ₁ 和 θ₂ 分别是入射角和折射角。"
  },
  {
    title: "4. 折射现象的应用",
    text: "透镜的原理：透镜利用光的折射原理来改变光线的传播方向，用于制作眼镜、照相机、显微镜等光学仪器。<br><br>海市蜃楼：海市蜃楼是由于空气密度变化引起的光的折射现象，使得远处物体看起来像水上的倒影。"
  },
  {
    title: "5. 光的折射实验",
    text: "探究折射现象：可以用水、玻璃等介质进行实验，观察光线在界面上的偏折。<br><br>测量折射率：可以用光具箱、激光器等设备，测量不同介质的折射率。"
  }
]

const components = [HDRViewer, HDRViewer, HDRViewer, HDRViewer, HDRViewer]

const currentIndex = ref(0)
const slide = ref(slides[0])
const isCollapsed = ref(false)

const currentComponent = computed(() => {
  return components[Math.min(currentIndex.value, components.length - 1)]
})

function nextSlide() {
  if (currentIndex.value < slides.length - 1) {
    currentIndex.value++
    slide.value = slides[currentIndex.value]
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    slide.value = slides[currentIndex.value]
  }
}
</script>

<style scoped>
.app-header {
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.app-footer {
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
  background: #f9f9f9;
  color: #888;
}

.sidebar {
  background: linear-gradient(to bottom right, #f0f4ff, #dde7f3);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.slide-content {
  flex: 1;
  overflow-y: auto;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.viewer-container {
  position: relative;
  background: #ffffff;
  padding: 0;
}

.collapse-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
}
</style>
