import { App } from 'vue'
import Header from './Header.vue'

export default (app: App<Element>) => {
  app.component(Header.name, Header)
}