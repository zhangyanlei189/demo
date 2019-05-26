import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './routers'
import axios from 'axios'
import Utile from "./utils/api";

Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.baseUrl = Utile.baseUrl;

Vue.use(MintUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
