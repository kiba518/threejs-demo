<template>
  <div id="app">
<!--    <el-menu mode="horizontal" default-active="scene0" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">-->
<!--      <el-menu-item index="scene0">-->
<!--        <router-link to="/scene0">场景0</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="scene1">-->
<!--        <router-link to="/scene1">场景1</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="scene2">-->
<!--        <router-link to="/scene2">场景2</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="scene3">-->
<!--        <router-link to="/scene3">场景3</router-link>-->
<!--      </el-menu-item>-->
<!--    </el-menu>-->

    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.el-menu {
  border: none;
}
.el-menu-item a {
  color: inherit;
  text-decoration: none;
}
.el-menu-item a:hover {
  text-decoration: underline;
}
</style>
