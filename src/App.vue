<script setup>
import { RouterView } from 'vue-router'
import useElementI18n from './hooks/useElementI18n'
import { useAppStore } from '@/stores/modules/app'

const useApp = useAppStore()
const { locale } = useElementI18n()
</script>

<template>
  <el-configProvider :locale="locale" :size="useApp.appConfig.elementSize">
    <RouterView />
  </el-configProvider>
</template>
