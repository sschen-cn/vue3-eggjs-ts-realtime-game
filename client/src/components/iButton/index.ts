import { App } from 'vue'
import iButton from './iButton.vue'

export default (app: App<Element>) => {
  app.component(iButton.name, iButton)
}