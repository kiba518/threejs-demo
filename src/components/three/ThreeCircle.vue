<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)

let scene, camera, renderer, mixer, clock, animationFrameId

onMounted(() => {
  init()
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  renderer.dispose()
})

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 2, 5)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)

  clock = new THREE.Clock()

  // 加载 glTF 模型
  const loader = new GLTFLoader()
  loader.load(
      'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
      (gltf) => {
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const clip = gltf.animations[0] // 第一个动画剪辑
        const action = mixer.clipAction(clip)
        action.play()
      },
      undefined,
      (error) => {
        console.error('模型加载错误:', error)
      }
  )

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationFrameId = requestAnimationFrame(animate)

  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)

  renderer.render(scene, camera)
}
</script>

<style scoped>
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
