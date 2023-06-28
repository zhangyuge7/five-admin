<script setup>
import Burger from '@/layout/components/Burger.vue'
import Breadcrumb from '@/layout/components/Breadcrumb.vue'
</script>

<template>
  <div class="fv-header-height fv-border-bottom flex items-center">
    <div class="h-full flex items-center">
      <Burger />
      <Breadcrumb style="margin-left: 20px;" />
    </div>
  </div>
</template>
