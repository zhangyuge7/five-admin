<script setup>
import { useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'

const route = useRoute()
</script>

<template>
  <div class="fv-breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="{ path: item.path }">
        <div class="flex">
          <el-icon v-if="item.meta?.icon">
            <SvgIcon :name="item.meta.icon" />
          </el-icon>
          <span v-if="item.meta?.title" style="margin-left: 3px;">
            {{ $t(item.meta.title) }}
          </span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
:deep(.el-breadcrumb__separator){
  margin: 0 5px;
}
</style>

<style>
.fv-breadcrumb .el-breadcrumb__inner a, .fv-breadcrumb .el-breadcrumb__inner.is-link{
  font-weight: 500;
}
</style>
