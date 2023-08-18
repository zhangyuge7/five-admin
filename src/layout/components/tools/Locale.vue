<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useAppStore } from '@/stores/modules/app'
import i18n from '@/i18n'
import { defaultLanguages } from '@/appConfig'

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
          <el-dropdown-item v-for="item in defaultLanguages" :key="item.value" :command="item.value" :disabled="locale === item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
