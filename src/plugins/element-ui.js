import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import "element-ui/lib/theme-chalk/index.css";

// 按需引入
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

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

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
