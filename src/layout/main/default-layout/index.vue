<script setup>
import { computed, ref } from 'vue'
import LayoutMain from '../LayoutMain.vue'

defineOptions({ name: 'DefaultLayout' })

const layoutFixedBoolean = ref(true) // 控制header与left是否固定
const layoutFixed = computed(() => layoutFixedBoolean.value ? 'overflow-auto' : '')
</script>

<template>
  <div class="fv-default-layout">
    <div class="fv-default-layout-top">
      top
    </div>
    <div class="fv-default-layout-bottom" :class="[layoutFixed]">
      <div class="fv-default-layout-left">
        left
      </div>
      <div class="fv-default-layout-main" :class="[layoutFixed]">
        <LayoutMain />
        <div class="fv-default-layout-footer">
          <span>
            footer
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fv-default-layout-footer{
    @apply
    w-full
    flex
    justify-center
    absolute
    bottom-0
}
.fv-default-layout-main{
    position: relative;
    flex-grow: 1;
}
.fv-default-layout-left{
    background-color: antiquewhite;
    width: 200px;
    flex-shrink: 0;
}
.fv-default-layout-bottom{
    @apply
    flex-grow
    flex
}
.fv-default-layout-top{
    height: 52px;
    background-color: aqua;
    flex-shrink: 0;

}
.fv-default-layout{
    @apply
    flex
    flex-col
    w-full
    h-screen
}
</style>
