<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VirtualSide from '@/components/VirtualSlide.vue'
import { randomColor } from '@/utils'

interface IItem {
  index: number
  title: string
  background: string
}
const list = ref<IItem[]>([])
const total = ref(0)

function load() {
  for (let i = 0; i < 10; i++) {
    list.value.push({
      index: i + 1,
      title: `第${i + 1}个`,
      background: randomColor(),
    })
  }
  total.value = 10
}
onMounted(() => {
  load()
})
</script>

<template>
  <VirtualSide
    v-if="total"
    :list="list"
    :total="total"
  >
    <template #default="{ data }">
      <div :style="{ background: data.background, height: '100%' }">
        <div>{{ data.title }}</div>
      </div>
    </template>
  </VirtualSide>
</template>

<style scoped lang="scss">
</style>
