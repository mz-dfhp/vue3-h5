import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
}
setupApp()
app.mount('#app')
