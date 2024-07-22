import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash-es'
/**
 * @description 处理窗口大小调整事件
 */
export function useWindowResize() {
  const winWidth = ref(0)
  const winHeight = ref(0)
  function handleResize() {
    winWidth.value = document.documentElement.clientWidth
    winHeight.value = document.documentElement.clientHeight
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', throttle(handleResize, 200))
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  onActivated(() => {
    handleResize()
    window.addEventListener('resize', throttle(handleResize, 200))
  })

  onDeactivated(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    winWidth,
    winHeight,
  }
}
