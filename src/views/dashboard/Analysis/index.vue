<script setup name="Analysis">
import { ref } from 'vue'

import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'

const useApp = useAppStore()
const useUser = useUserStore()

const count = ref(0)
function doLogout() {
  useUser.logout()
}
</script>

<template>
  <div>
    <el-input-number v-model="count" />
    <div>分析页</div>

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

    <span>{{ $t('http.error') }}</span>
    <span>{{ $t('login.loginButton') }}</span>
    <span>{{ $t('system.menu') }}</span>

    <el-button @click="doLogout">
      退出登录
    </el-button>

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
