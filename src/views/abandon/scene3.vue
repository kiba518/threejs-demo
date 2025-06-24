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

onMounted(() => {
  init()
  animate()
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
  renderer.outputEncoding = THREE.sRGBEncoding
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // ✅ 加载 HDR 全景贴图
  const loader = new RGBELoader()
  loader.load('/imgs/realHdr.hdr', (texture) => {
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
  })

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
