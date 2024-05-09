import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './stylesheet/index.css'
// import Swal from './useSwal'
// import '@sweetalert2/theme-minimal/minimal.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(Swal)
app.mount('#app')
