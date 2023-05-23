import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "./utils/common";
import "./utils/filters";

// BootStrap Import
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// BootStrap Use
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(common);
Vue.directive("focus", {
  inserted(el) {
     el.focus();
  }
});

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
