import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueQrcodeReader from "vue-qrcode-reader";
import AxiosPlugin from 'vue-axios-cors';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueQrcodeReader);
Vue.use(VueSimpleAlert);
window.axios=axios
Vue.config.productionTip = false

new Vue({
  vuetify,

  router,
  VueQrcodeReader,
  AxiosPlugin,
  VueSimpleAlert,
  render: h => h(App)
}).$mount('#app')
