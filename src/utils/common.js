export const methods = {
  // 기본 토스트
  alertDefault(title, message) {
    this.$root.$bvToast.toast(message, {
      title: title,
      variant: "default",
      toaster: "b-toaster-top-right",
      solid: true,
    });
  },
  // 성공 토스트
  alertSuccess(title, message) {
    this.$root.$bvToast.toast(message, {
      title: title,
      variant: "success",
      toaster: "b-toaster-top-right",
      solid: true,
    });
  },
  // 실패 토스트
  alertDanger(title, message) {
    this.$root.$bvToast.toast(message, {
      title: title,
      variant: "danger",
      toaster: "b-toaster-top-right",
      solid: true,
    });
  },
};

export default {
  install(Vue) {
    Vue.prototype.$alertDefault = methods.alertDefault;
    Vue.prototype.$alertSuccess = methods.alertSuccess;
    Vue.prototype.$alertDanger = methods.alertDanger;
  },
};