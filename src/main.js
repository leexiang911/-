import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cloudbase from "@cloudbase/vue-provider";
Vue.use(Cloudbase, {
  env: "cloudbase-baas-5gbp91cgdef4798a"
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
