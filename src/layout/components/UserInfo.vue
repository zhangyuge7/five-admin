<script setup>
import { ArrowDown, SwitchButton, User, UserFilled } from '@element-plus/icons-vue'
import { onBeforeMount } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
// 定义数据
let avatar = ''
let nickName = ''

// 页面挂载前
onBeforeMount(() => {
  avatar = userStore.userInfo.avatar
  nickName = userStore.userInfo.nickName
})

// 下拉菜单指令
function command(flag) {
  // 退出登录
  if (flag === 'logout')
    userStore.logout()
  else if (flag === 'userinfo')
    router.push('/user-info')
}
</script>

<template>
  <el-dropdown @command="command">
    <div class="el-dropdown-link">
      <el-avatar :src="avatar" :size="32" :icon="UserFilled" />
      <span class="ml-1">{{ nickName }}</span>
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userinfo">
          <el-icon>
            <User />
          </el-icon>
          <span>{{ $t("user.personalCenter") }}</span>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>{{ $t("user.logout") }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
