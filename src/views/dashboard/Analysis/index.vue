<script setup name="Analysis">

</script>

<template>
  <div>
    <div>分析页</div>

    <span v-for="i in 100" :key="i">{{ i }}</span>
    <p v-for="i in 100" :key="i">
      {{ i }}
    </p>
  </div>
</template>
