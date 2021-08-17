import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vant from "vant";
import "vant/lib/index.css";
import Toast from "./components/toast/index";
import "@vant/touch-emulator";
import VueClipboard from "vue-clipboard2";
// import Vconsole from "vconsole";
// let VConsole = new Vconsole();
// Vue.use(VConsole);
import "element-ui/lib/theme-chalk/index.css";
import {
  Table,
  TableColumn,
  DatePicker,
  Switch,
  Form,
  Dialog,
  Button,
  Input,
  Rate,
  FormItem
} from "element-ui";
// Vue.use(VConsole);

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.use(Toast);
Vue.use(Table);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Input);
Vue.use(Rate);
Vue.use(FormItem);

import Header from "@/components/header";

Vue.component("Header", Header); //全局自定义Header组件

Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = el.dataset.title;
  }
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.path == "/phone/loginPhone") {
    localStorage.setItem("fromRouterPath", from.path);
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
  // mounted() {
  //   document.dispatchEvent(new Event("render-event"));
  // }
}).$mount("#app");
