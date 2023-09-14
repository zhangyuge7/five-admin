<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const count = ref(0)
</script>

<template>
  <div>
    数据大屏1-缓存组件
    <el-input-number v-model="count" />
    <RouterLink to="/screen/2">
      去大屏2
    </RouterLink>
  </div>
</template>
