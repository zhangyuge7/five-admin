<script setup name="NotFound">
import router from '@/router'

function toIndex() {
  router.push('/')
}
function doBack() {
  router.back()
}
</script>

<template>
  <div>
    <p>404</p>
    <el-button type="primary" @click="toIndex">
      回首页
    </el-button>
    <el-button type="primary" @click="doBack">
      回上一页
    </el-button>
  </div>
</template>

<style scoped>

</style>
