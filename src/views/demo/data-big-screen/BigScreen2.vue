<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    数据大屏2
    <el-input-number v-model="count" />
    <RouterLink to="/screen/1">
      去大屏1
    </RouterLink>
  </div>
</template>
