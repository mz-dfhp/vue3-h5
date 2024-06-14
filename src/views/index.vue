<script setup lang="ts">
import { modulesRoutes } from '@/router/moduleRoutes'
</script>

<template>
  <div class="wrapper">
    <button
      v-for="route in modulesRoutes"
      :key="route.path"
      @click="$router.push(route.path)"
    >
      {{ route.path }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  background: skyblue;

  button {
    margin: 10px;
    width: 100px;
    height: 50px;
  }
}
</style>
