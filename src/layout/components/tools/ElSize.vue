<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useAppStore } from '@/stores/modules/app'
import { elementSizes } from '@/appConfig'

const appStore = useAppStore()

function command(flag) {
  appStore.appConfig.elementSize = flag
}
const size = computed(() => appStore.appConfig.elementSize)
</script>

<template>
  <div class="tools-item">
    <el-dropdown class="h-full" size="default" @command="command">
      <div class="el-dropdown-link">
        <el-icon size="18">
          <SvgIcon name="iconoir:text-size" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in elementSizes" :key="item.value" :command="item.value" :disabled="size === item.value">
            {{ $t(item.label) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
