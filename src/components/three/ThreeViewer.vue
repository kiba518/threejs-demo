<template>
  <div ref="container" class="viewer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 2, 10)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()

  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  const glassMaterial = new THREE.MeshPhongMaterial({ color: 0x88ccff, transparent: true, opacity: 0.5 })
  const glass = new THREE.Mesh(new THREE.BoxGeometry(5, 0.5, 3), glassMaterial)
  glass.name = "glass"
  scene.add(glass)

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
  const points = [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, -1, 0)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const laserLine = new THREE.Line(geometry, lineMaterial)
  laserLine.name = "laserLine"
  scene.add(laserLine)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  window.addEventListener('click', (event) => {
    const bounds = renderer.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      const name = intersects[0].object.name
      if (name === "glass") {
        alert("这是一个玻璃介质模型，用于展示光在不同介质中的折射。")
      } else if (name === "laserLine") {
        alert("这是一条激光轨迹，用于模拟光线在介质边界上的折射路径。")
      }
    }
  })

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  if (!container.value) return
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
</script>

<style scoped>
.viewer {
  flex-grow: 1;
  height: 100%;
}
</style>
