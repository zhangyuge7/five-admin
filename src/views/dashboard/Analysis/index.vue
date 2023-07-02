<script setup name="Analysis">
import { useAppStore } from '@/stores/modules/app'

const useApp = useAppStore()
</script>

<template>
  <div>
    <div>分析页</div>

    <div>
      <span>多标签页</span>
      <el-switch
        v-model="useApp.appConfig.isTabs"
      />

      <span>显示多标签页图标</span>
      <el-switch
        v-model="useApp.appConfig.tabsIcon"
      />
    </div>

    <span v-for="i in 100" :key="i">{{ i }}</span>
    <p v-for="i in 100" :key="i">
      {{ i }}
    </p>
  </div>
</template>
