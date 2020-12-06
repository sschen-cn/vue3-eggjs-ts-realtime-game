import { App } from 'vue'
import iDialog from './iDialog.vue'

export default (app: App<Element>) => {
  app.component(iDialog.name, iDialog)
}