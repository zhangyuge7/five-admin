<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

function command(flag) {
  appStore.appConfig.elementSize = flag
}
const size = computed(() => appStore.appConfig.elementSize)
</script>

<template>
  <div class="tools-item">
    <el-dropdown class="h-full" @command="command">
      <div class="el-dropdown-link">
        <el-icon size="18">
          <SvgIcon name="iconoir:text-size" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="default" :disabled="size === 'default'">
            {{ $t('size.default') }}
          </el-dropdown-item>
          <el-dropdown-item command="large" :disabled="size === 'large'">
            {{ $t('size.large') }}
          </el-dropdown-item>
          <el-dropdown-item command="small" :disabled="size === 'small'">
            {{ $t('size.small') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
