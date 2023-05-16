import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "./utils/common";

// BootStrap Import
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// BootStrap Use
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(common);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
