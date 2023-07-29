<script setup name="Analysis">

</script>

<template>
  <div class="w-[60px] h-[60px]">
    <div class="layout-mini-box">
      <div class="layout-mini-aside" />
      <div class="layout-mini-header" />
    </div>
  </div>
</template>

<style scoped>
.layout-mini-header{
  /* width: 70%; */
  flex-grow: 1;
  height: 30%;
  background-color: var(--fv-header-bg-color);
}
.layout-mini-aside{
  width: 30%;
  height: 100%;
  background-color: var(--fv-side-bg-color);
}
.layout-mini-box{
  width: 100%;
  height: 100%;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--fv-main-bg-color);
  /* border: 1px solid var(--el-border-color); */
  display: flex;
}
</style>
