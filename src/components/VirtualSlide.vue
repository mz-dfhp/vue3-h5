<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useWindowResize } from '@/hooks/useWindowResize'

const props = withDefaults(defineProps<{
  count?: number
  total: number // 总数
  list: any[]
}>(), {
  count: 5,
  total: 0,
  list: () => [],
})

const emit = defineEmits<{
  (e: 'refresh'): void // 刷新
  (e: 'load'): void // 加载
  (e: 'updateActiveIndex', index: number): void // 加载
}>()

const wrapperRef = ref()
const listRef = ref()

const countList = ref<any[]>([]) // 生成的count列表

const activeIndex = ref(0) // 当前索引
const startY = ref(0) // 开始位置
const moveY = ref(0) // 移动距离
const startTime = ref(0) // 开始时间
const { winHeight } = useWindowResize()// 屏幕高度

const itemTop = computed(() => (activeIndex.value - 1) * winHeight.value)

function onTouchstart(e: TouchEvent) {
  startY.value = e.touches[0].clientY
  startTime.value = Date.now()
}

function onTouchmove(e: TouchEvent) {
  // 正 上滑 负 下滑
  moveY.value = e.touches[0].clientY - startY.value
  // 如果是第一个 上滑不变
  if (activeIndex.value === 0 && moveY.value > 0) {
    emit('refresh')
    console.log('上拉刷新')
    return
  }
  // 如果是最后一个 下滑不变
  if (activeIndex.value === props.total - 1 && moveY.value < 0) {
    console.log('没有更多了')
    return
  }
  moveTo(moveY.value - activeIndex.value * winHeight.value, 'none')
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
        if (activeIndex.value + countList.value.length >= props.list.length)
          loadData()
      }
    }
  }
  moveTo(-activeIndex.value * winHeight.value, 'all 0.3s')
  changeList()
  nextTick(() => {
    emit('updateActiveIndex', activeIndex.value)
  })
  resetTouchValues()
}

function loadData() {
  // 需要加载数据
  emit('load')
  console.log('需要加载数据')
}

function changeList() {
  // 是否需要切换 增删
  if (shouldTogglePage()) {
    // 如果是上一页 删除最后一个 新增一个到开头
    if (moveY.value > 0 && activeIndex.value !== 0) {
      // console.log('删后 增前')
      const index = countList.value[0].index
      const findIndex = props.list.findIndex(item => item.index === index)
      countList.value.pop()
      countList.value.unshift({ ...(findIndex !== -1 ? props.list[findIndex - 1] : {}), uuid: UUID() })
    }
    // 如果是下一页 删除第一个 新增一个到末尾
    if (moveY.value < 0 && activeIndex.value > 1) {
      // todo 全局重点
      // activeIndex - 1 为了最后一个永远保持在第二个
      if (activeIndex.value - 1 < props.total - 1) {
        const index = countList.value.slice(-1)[0].index
        const findIndex = props.list.findIndex(item => item.index === index)
        countList.value.shift()
        countList.value.push({ ...(findIndex !== -1 ? props.list[findIndex + 1] : {}), uuid: UUID() })
      }
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
  activeIndex.value = 0
  countList.value = props.list.slice(0, Math.min(props.total, props.count)).map(item => ({ ...item, uuid: UUID() }))
}

// 是否需要切换
function shouldTogglePage() {
  // 是否是快速滑动
  const duration = Date.now() - startTime.value
  const speed = Math.abs(moveY.value) / duration
  const isFast = speed > 0.5
  // 滑动距离超过主容器二分之一
  const isMove = Math.abs(moveY.value) > winHeight.value / 2
  return isMove || isFast
}

function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

onMounted(() => {
  init()
  emit('updateActiveIndex', activeIndex.value)
})
</script>

<template>
  <div
    ref="wrapperRef" class="wrapper"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
  >
    <div
      ref="listRef"
      class="list"
    >
      <div
        v-for="(item, index) in countList"
        :key="item.uuid"
        class="item"
        :data-index="index + activeIndex"
        :style="{ top: `${Math.max(itemTop, 0)}px` }"
      >
        <slot
          :active-index="activeIndex"
          :data="item"
        />
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
    }
  }
}
</style>
