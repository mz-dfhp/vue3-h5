<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { randomColor } from '@/utils'

interface IItem {
  index: number
  title: string
  background: string
}

const wrapperRef = ref()
const listRef = ref()

const total = ref(0)
const countList = ref<IItem[]>([])
const list = ref<IItem[]>([])

const middleIndex = ref(0) // 中间索引
const activeIndex = ref(0) // 当前索引
const startY = ref(0) // 开始位置
const moveY = ref(0) // 移动距离
const startTime = ref(0) // 开始时间
const wrapperHeight = ref(document.documentElement.clientHeight) // 屏幕高度

function onTouchstart(e: TouchEvent) {
  startY.value = e.touches[0].clientY
  startTime.value = Date.now()
}

function onTouchmove(e: TouchEvent) {
  // 正 上滑 负 下滑
  moveY.value = e.touches[0].clientY - startY.value
  // 如果是第一个 上滑不变
  if (activeIndex.value === 0 && moveY.value > 0)
    return console.log('上拉刷新')
  // 如果是最后一个 下滑不变
  if (activeIndex.value === total.value - 1 && moveY.value < 0)
    return console.log('没有更多了')
  moveTo(moveY.value - activeIndex.value * wrapperHeight.value, 'none')
}

function onTouchend() {
  if (shouldTogglePage()) {
    // 上一页
    if (moveY.value > 0) {
      if (activeIndex.value === 0) {
        console.log('上拉刷新')
        return
      }
      else {
        activeIndex.value--
      }
    }
    // 下一页
    if (moveY.value < 0) {
      if (activeIndex.value === total.value - 1) {
        console.log('没有更多了')
        return
      }
      else {
        activeIndex.value++
      }
    }
  }
  moveTo(-activeIndex.value * wrapperHeight.value, 'all 0.3s')
  resetTouchValues()
}

function moveTo(value: number, transition: string) {
  listRef.value.style.transition = transition
  listRef.value.style.transform = `translateY(${value}px)`
}

function resetTouchValues() {
  startY.value = 0
  moveY.value = 0
}

function init() {
  list.value = [...Array(20)].map((_, index) => ({
    index: index + 1,
    title: `第${index + 1}个`,
    background: randomColor(),
  }))
  total.value = list.value.length
  countList.value = list.value.slice(0, Math.min(total.value, 5))
  middleIndex.value = Math.floor(countList.value.length / 2)
}

// 是否需要切换
function shouldTogglePage() {
  // 是否是快速滑动
  const duration = Date.now() - startTime.value
  const speed = Math.abs(moveY.value) / duration
  const isFast = speed > 0.5
  // 滑动距离超过主容器二分之一
  const isMove = Math.abs(moveY.value) > wrapperHeight.value / 2
  return isMove || isFast
}

function getTop() {
  return 0
}

onMounted(() => {
  init()
})
</script>

<template>
  <div ref="wrapperRef" class="wrapper" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
    <div ref="listRef" class="list">
      <div
        v-for="(item) in countList"
        :key="item.index"
        class="item"
        :data-index="item.index"
        :style="{
          top: getTop(),
          background: item.background,
        }"
      >
        {{ item.title }}:
        <div>activeIndex：{{ activeIndex }}</div>
        <div>middleIndex：{{ middleIndex }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  overflow: hidden;
  touch-action: none;

  .list {
    height: 100%;

    .item {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 40px;
    }
  }
}
</style>
