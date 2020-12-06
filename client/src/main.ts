import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import Header from './components/Header'
import iButton from './components/iButton'
const app = createApp(App)
app
  .use(Header)
  .use(iButton)
  .use(router)
  .mount('#app')
