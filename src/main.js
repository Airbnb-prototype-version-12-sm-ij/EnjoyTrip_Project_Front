import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './stylesheet/index.css'
import App from './App.vue'
import router from './router'
// import VueSession from 'vue-session'

// var sessionOptions = {
//   persist: true
// }

const app = createApp(App)

// app.use(VueSession, sessionOptions)
app.use(createPinia())
app.use(router)
app.mount('#app')
