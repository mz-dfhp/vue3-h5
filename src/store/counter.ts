import { defineStore } from 'pinia'
import { ref } from 'vue'

const pid = 'STORE__COUNTER'
export const useCounterStore = defineStore(
  pid,
  () => {
    const count = ref(0)
    function increment() {
      count.value++
    }
    function decrement() {
      count.value--
    }
    return { count, increment, decrement }
  },
  {
    persist: true,
  },
)
