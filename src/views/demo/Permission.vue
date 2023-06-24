<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { hasRole } from '@/utils/auth'

const userStore = useUserStore()
const getRoles = computed(() => userStore.userInfo.roles)
const getPerms = computed(() => userStore.userInfo.perms)
</script>

<template>
  <div>
    <el-divider>根据角色判断权限</el-divider>
    <span>当前角色 {{ getRoles }}</span>

    <p>指令方式</p>
    <el-button v-hasRole="'admin'" type="primary">
      admin角色可见
    </el-button>
    <el-button v-hasRole="'test'" type="primary">
      test角色可见
    </el-button>
    <el-button v-hasRole="['admin', 'test']" type="warning">
      ['admin', 'test']角色可见
    </el-button>
    <el-divider />
    <p>函数方式</p>
    <el-button v-if="hasRole('admin')" type="primary">
      admin角色可见
    </el-button>
    <el-button v-if="hasRole('test')" type="primary">
      test角色可见
    </el-button>
    <el-button v-if="hasRole(['admin', 'test'])" type="warning">
      ['admin', 'test']角色可见
    </el-button>

    <el-divider>根据权限标识符判断权限</el-divider>
    <span>当前拥有权限标识符 {{ getPerms }}</span>
    <p>指令方式</p>
    <el-button v-hasPerm="'admin:button'" type="primary">
      admin:button可见
    </el-button>
    <el-button v-hasPerm="'test:button'" type="primary">
      test:button可见
    </el-button>
    <el-button v-hasPerm="['admin:button', 'test:button']" type="warning">
      ['admin:button', 'test:button']可见
    </el-button>
  </div>
</template>
