<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="tools-item" @click="toggleDark()">
    <el-icon size="18">
      <Sunny v-if="isDark" />
      <Moon v-else />
    </el-icon>
  </div>
</template>
