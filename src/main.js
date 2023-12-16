import './assets/main.css'
//importacion de una dependencia que te crea formularios rapidamente se instala con npm i @formkit/vue
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
// y aqui la usamos como con router
app.use(plugin, defaultConfig(config))

app.mount('#app')
