import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import './assets/header.css'
import './assets/home.css'
import './assets/docs.css'
import './assets/pages.css'

// Mount once the first route's chunk has loaded, so the shell never flashes empty.
const app = createApp(App).use(router)
router.isReady().then(() => app.mount('#app'))
