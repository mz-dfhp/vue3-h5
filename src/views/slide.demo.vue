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
    for (let i = 0; i < 40; i++) {
      list.value.push({
        index: i + 1,
        title: `第${i + 1}个`,
        background: randomColor(),
      })
    }
    total.value = 40
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
  />
</template>

<style scoped lang="scss">
</style>
