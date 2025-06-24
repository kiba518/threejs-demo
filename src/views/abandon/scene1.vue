<template>
  <div ref="container" class="panorama-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = ref(null)

onMounted(() => {
  let camera, scene, renderer, controls

  // 初始化场景
  scene = new THREE.Scene()

  // 摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
  camera.position.set(0, 0, 0.1) // 位置在球体内中心

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // 加载全景图纹理
  const loader = new THREE.TextureLoader()
  loader.load('imgs/squirrel.png', texture => {
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // 贴图在球体内侧

    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
  })

  // 控制器（允许用户拖动视角）
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // 窗口尺寸适配
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<style scoped>
.panorama-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
