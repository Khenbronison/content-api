import './assets/main.css'
import Notifications from '@kyvg/vue3-notification'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedState))
app.use(router)
app.use(Notifications)

app.mount('#app')
