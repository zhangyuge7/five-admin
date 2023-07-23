<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useAppStore } from '@/stores/modules/app'
import i18n from '@/i18n'

const appStore = useAppStore()

function command(flag) {
  i18n.global.locale = flag
  appStore.appConfig.defaultLanguage = flag
}
const locale = computed(() => appStore.appConfig.defaultLanguage)
</script>

<template>
  <div class="tools-item">
    <el-dropdown class="h-full" size="default" @command="command">
      <div class="el-dropdown-link">
        <el-icon size="18">
          <!-- <SvgIcon name="vscode-icons:file-type-locale" /> -->
          <SvgIcon name="ant-design:global-outlined" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn" :disabled="locale === 'zh-cn'">
            简体中文
          </el-dropdown-item>
          <el-dropdown-item command="zh-tw" :disabled="locale === 'zh-tw'">
            繁體中文
          </el-dropdown-item>
          <el-dropdown-item command="en" :disabled="locale === 'en'">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
