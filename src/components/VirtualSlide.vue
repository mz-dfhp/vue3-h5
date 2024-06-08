<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  total: number // 总数
  list: Array<IItem>
}>(), {
  total: 20,
  list: () => [],
})

interface IItem {
  index: number
  title: string
  background: string
}

const wrapperRef = ref()
const listRef = ref()

const countList = ref<IItem[]>([]) // 生成的count列表

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
  if (activeIndex.value === props.total - 1 && moveY.value < 0)
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
      if (activeIndex.value === props.total - 1) {
        console.log('没有更多了')
        return
      }
      else {
        activeIndex.value++
        if (activeIndex.value >= middleIndex.value) {
          loadData()
        }
      }
    }
  }
  changeList()
  moveTo(-activeIndex.value * wrapperHeight.value, 'all 0.3s')
  resetTouchValues()
}

function loadData() {
  // 需要加载数据
  console.log('需要加载数据')
}

function changeList() {
  // 是否需要切换 增删
  if (shouldTogglePage()) {
    const needRemoveFirst = activeIndex.value < props.total - middleIndex.value - 1
    const needRemoveLast = activeIndex.value < props.total - middleIndex.value - 2
    // 如果是上一页 删除最后一个 新增一个到开头
    if (moveY.value > 0 && needRemoveLast && (activeIndex.value >= middleIndex.value || activeIndex.value === middleIndex.value - 1)) {
      console.log('删后 增前')
      const index = activeIndex.value - middleIndex.value + 1
      countList.value.pop()
      countList.value.unshift(props.list[index])
    }
    // 如果是下一页 删除第一个 新增一个到末尾
    if (moveY.value < 0 && needRemoveFirst && activeIndex.value >= middleIndex.value) {
      console.log('删前 增后')
      const index = activeIndex.value - middleIndex.value + countList.value.length
      countList.value.shift()
      countList.value.push(props.list[index])
    }
  }
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
  countList.value = props.list.slice(0, Math.min(props.total, 5))
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
  if (activeIndex.value >= middleIndex.value) {
    const count = activeIndex.value - middleIndex.value + 1
    const maxCount = props.total - 1 - middleIndex.value - 2
    const result = Math.min(count, maxCount) * wrapperHeight.value
    return `${Math.max(result, 0)}px`
  }
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
