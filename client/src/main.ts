import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import Header from './components/Header'
import iButton from './components/iButton'
import iDialog from './components/iDialog'
import packageInfo from '../package.json'
const app = createApp(App)

console.log(`App version: ${packageInfo.version}`)
console.log(`Vue version: ${app.version}`)

app.config.globalProperties.$dialog = iDialog

app
  .use(Header)
  .use(iButton)
  .use(router)
  .mount('#app')
