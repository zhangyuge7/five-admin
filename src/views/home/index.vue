<script setup name="Home">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    首页
    <el-input-number v-model="count" />

    <div>----------- v-hasRole:or --------------</div>
    <div v-hasRole="['role1', 'role4']">
      admin,test都显示
    </div>

    <div>----------- v-hasRole:all --------------</div>

    <div v-hasRole:all="['role1', 'role4']">
      都不显示显示
    </div>
  </div>
</template>
