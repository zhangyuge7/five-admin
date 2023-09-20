<script setup name="Workbench">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <el-input-number v-model="count" />
    工作台
  </div>
</template>
