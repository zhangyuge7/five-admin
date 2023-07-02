<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { t } from '@/i18n'

const isDark = useDark()

const toggleDark = useToggle(isDark)
const title = computed(() => t('tools.theme'))
</script>

<template>
  <div class="tools-item" :title="title" @click="toggleDark()">
    <el-icon size="18">
      <Sunny v-if="isDark" />
      <Moon v-else />
    </el-icon>
  </div>
</template>
