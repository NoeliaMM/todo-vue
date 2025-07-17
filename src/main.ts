import './assets/tailwind.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import fontAwesomePlugin from "./plugins/fontAwesome";


import App from './App.vue'
import router from './router'

const app = createApp(App)

fontAwesomePlugin(app);

app.use(createPinia())
app.use(router)

app.mount('#app')
