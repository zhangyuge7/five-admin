<script setup name="Home">

</script>

<template>
  <div>
    <span v-for="i in 100" :key="i">{{ i }}</span>
    <p v-for="i in 100" :key="i">
      {{ i }}
    </p>
  </div>
</template>
