<template>
    <el-container>
        <layout-left></layout-left>
    <!-- 大容器 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- 二级路由容器，子路由会渲染到这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header.vue'
import layoutLeft from '../../components/layout-left.vue'

export default {
  components: {
    'layout-header': layoutHeader,
    'layout-left': layoutLeft
  }
//   components: {
//     'layout-left': layoutLeft
//   }
}
</script>

<style>

</style>
