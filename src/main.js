import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Cloudbase from "@cloudbase/vue-provider";
Vue.use(Cloudbase, {
  env: "cloudbase-baas-5gbp91cgdef4798a"
})

// 配置bootstrap-vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
