import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import Header from './components/Header'
import iButton from './components/iButton'
import iDialog from './components/iDialog'
const app = createApp(App)
app.config.globalProperties.$dialog = iDialog
app.use(Header).use(iButton)
app.use(router).mount('#app')
