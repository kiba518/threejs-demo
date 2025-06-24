<template>
  <div ref="container" class="scene-container"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const container = ref(null)

let scene, camera, renderer, controls, animationId
let tableMesh


const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
function onClick(event) {
  // 计算鼠标在标准设备坐标中的位置（-1 到 +1）
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  // 只检测桌子这个物体，或者检测场景里的所有物体
  const intersects = raycaster.intersectObject(tableMesh)

  if (intersects.length > 0) {
    // 点中了桌子
    alert('你点击了桌子！这里可以弹出自定义提示')
  }
}
function createTable() {
  const geometry = new THREE.BoxGeometry(1, 0.5, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  tableMesh = new THREE.Mesh(geometry, material)
  tableMesh.position.set(0, -0.5, 10) // 放在合适位置  x加往右 y加往上 z加往后面
  scene.add(tableMesh)
}

onMounted(() => {
  init()
  animate()
  createTable()
  renderer.domElement.addEventListener('click', onClick)
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  controls.dispose()
  renderer.dispose()
  container.value.innerHTML = ''
})

function init() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // renderer.outputEncoding = THREE.SRGBColorSpace
  renderer.outputColorSpace = THREE.SRGBColorSpace  // ✅ 正确写法

  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // ✅ 加载 HDR 全景贴图
  const loader = new RGBELoader()
  loader.load('/imgs/s.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture

    // 可选：反光球体
    // const geometry = new THREE.SphereGeometry(1, 64, 64)
    // const material = new THREE.MeshStandardMaterial({
    //   metalness: 1,
    //   roughness: 0,
    //   envMap: texture
    // })
    // const sphere = new THREE.Mesh(geometry, material)
    // scene.add(sphere)
  },undefined,
      (error) => {
        console.error('HDR 加载失败', error)
      })
  // const loader = new RGBELoader()
  // loader.load('/imgs/s.hdr', (texture) => {
  //   texture.mapping = THREE.EquirectangularReflectionMapping
  //   scene.background = texture
  //   scene.environment = texture
  // })

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
</script>

<style scoped>
.scene-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
