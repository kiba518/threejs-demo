<template>
  <div ref="container" class="three-container"></div>
  <button @click="exportEXR">导出 EXR</button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { EXRExporter } from 'three/examples/jsm/exporters/EXRExporter.js'

const container = ref(null)

let renderer, scene, camera, cube, animationId

onMounted(() => {
  // 初始化场景
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // 添加一个旋转立方体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 灯光
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 10, 7)
  scene.add(light)

  // 动画循环
  function animate() {
    animationId = requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()

  // 窗口resize自适应
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onWindowResize)
  renderer.dispose()
})

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// 导出EXR函数
function exportEXR() {
  // 创建渲染目标，开启浮点纹理支持
  const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    type: THREE.FloatType,
    encoding: THREE.LinearEncoding,
  })

  // 渲染场景到渲染目标
  renderer.setRenderTarget(renderTarget)
  renderer.render(scene, camera)
  renderer.setRenderTarget(null)

  // 导出
  const exporter = new EXRExporter()
  const exrArrayBuffer = exporter.parse(renderTarget.texture)

  // 下载EXR文件
  const blob = new Blob([exrArrayBuffer], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'scene.exr'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  display: block;
  overflow: hidden;
}
button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  padding: 8px 16px;
}
</style>
