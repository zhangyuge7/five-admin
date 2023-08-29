<script setup name="NotFound">
import { HomeFilled, RefreshLeft } from '@element-plus/icons-vue'
import router from '@/router'

function toIndex() {
  router.push('/')
}
function doBack() {
  router.back()
}
</script>

<template>
  <div class="fv-error-404">
    <div style="text-align: center;">
      <el-button type="primary" :icon="HomeFilled" @click="toIndex">
        回首页
      </el-button>
      <el-button type="primary" :icon="RefreshLeft" @click="doBack">
        回上一页
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.fv-error-404{
  width: 100%;
  height: 100%;
  padding-top: 40%;
  background: url('/src/assets/images/error/404.png') no-repeat;
  background-color: #f3f7ff;
  background-position: 50% 20%;
}
</style>
