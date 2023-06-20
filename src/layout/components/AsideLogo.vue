<script setup>
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="flex flex-row">
    <img src="../../assets/images/logo.svg" class=" w-[32px]">
    <span class="title">{{ title }}</span>
  </div>
</template>

<style scoped>
.title{
    margin-left: 10px;
    font-size: 24px;
}
</style>
