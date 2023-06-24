<script setup name="Home">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    首页
    <!-- <div v-hasRole="['admin', 'test']">
      admin角色和test可以看到
    </div>
    <div v-hasRole="'admin'">
      admin角色可以看到
    </div>
    <div v-hasRole="'test'">
      test角色可以看到
    </div> -->
    <el-input-number v-model="count" />

    <div>----------- v-hasRole:or --------------</div>
    <div v-hasRole="['role1', 'role4']">
      admin,test都显示
    </div>
    <div v-hasRole="['role2', 'role3']">
      admin,test都显示
    </div>
    <div v-hasRole="'role2'">
      admin,test都显示
    </div>
    <div v-hasRole="'role3'">
      admin,test都显示
    </div>
    <div v-hasRole="'role1'">
      admin显示
    </div>
    <div v-hasRole="'role4'">
      test显示
    </div>
    <div v-hasRole="['role5', 'role6']">
      都不显示显示
    </div>
    <div>----------- v-hasRole:all --------------</div>
    <div v-hasRole:all="['role2', 'role3']">
      admin,test都显示
    </div>
    <div v-hasRole:all="['role1', 'role2', 'role3']">
      admin显示
    </div>
    <div v-hasRole:all="['role2', 'role3', 'role4']">
      test显示
    </div>
    <div v-hasRole:all="['role1', 'role3']">
      admin显示
    </div>
    <div v-hasRole:all="['role2', 'role4']">
      test显示
    </div>
    <div v-hasRole:all="['role1', 'role3', 'role3', 'role3']">
      admin显示
    </div>
    <div v-hasRole:all="['role1', 'role4']">
      都不显示显示
    </div>
  </div>
</template>
