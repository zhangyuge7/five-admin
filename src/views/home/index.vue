<script setup name="Home">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    首页
    <div v-hasRole="['admin', 'test']">
      admin角色和test可以看到
    </div>
    <div v-hasRole="'admin'">
      admin角色可以看到
    </div>
    <div v-hasRole="'test'">
      test角色可以看到
    </div>
    <el-input-number v-model="count" />
  </div>
</template>
