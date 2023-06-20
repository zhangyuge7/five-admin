<script setup>
// import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'

const useApp = useAppStore()
const useUser = useUserStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
// const size = ref(useAppStore.appConfig.elementSize)

function languageChange(v) {
  useApp.appConfig.defaultLanguage = v
}

function doLogout() {
  useUser.doLogout()
}
</script>

<template>
  <div>分析页</div>

  主题
  <el-button @click="toggleDark()">
    {{ isDark ? '明亮' : '暗黑' }}
  </el-button>

  语言
  <el-select v-model="$i18n.locale" @change="languageChange">
    <el-option label="中文简体" value="zh-cn" />
    <el-option label="中文繁体" value="zh-tw" />
    <el-option label="英文" value="en" />
  </el-select>
  组件大小
  <el-select v-model="useApp.appConfig.elementSize">
    <el-option label="大" value="large" />
    <el-option label="默认" value="default" />
    <el-option label="小" value="small" />
  </el-select>

  <el-pagination
    :page-sizes="[100, 200, 300, 400]" background layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  />

  <p>{{ $t("http.status") }}</p>

  <el-button @click="doLogout">
    退出登录
  </el-button>
</template>
