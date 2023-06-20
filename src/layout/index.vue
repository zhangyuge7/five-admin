<script setup>
import ClassicsLayout from './ClassicsLayout.vue'
import DefaultLayout from './DefaultLayout.vue'
import CrosswiseLayout from './CrosswiseLayout.vue'
import MixtureNavLayout from './MixtureNavLayout.vue'

const layout = 'default'
</script>

<template>
  <div>
    <!-- 默认布局 -->
    <DefaultLayout v-if="layout === 'default'" />
    <!-- 经典左右布局 -->
    <ClassicsLayout v-if="layout === 'classics'" />
    <!-- 横向上下布局 -->
    <CrosswiseLayout v-if="layout === 'crosswise'" />
    <!-- 混合导航布局 -->
    <MixtureNavLayout v-if="layout === 'mixture'" />
  </div>
</template>
