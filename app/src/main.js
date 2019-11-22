import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import Toasted from "vue-toasted";
let toastedOptions = {
  position: "top-center",
  duration: 5000,
  keepOnHover: true,
  iconPack: "mdi",
  theme: "toasted-primary",
  singleton: true
};
Vue.use(Toasted, toastedOptions);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
