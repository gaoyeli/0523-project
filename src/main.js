// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入重置样式css
import "./assets/css/reset.css"
//引入公共组件
import Components from "./components/index"
for(let i in Components){
  Vue.component(i,Components[i])
}
//处理过滤器
import Filters from "./filters/index"
for (let i in Filters){
  Vue.filter(i,Filters[i])
}
//处理库
import store from "./store"
Vue.config.productionTip = false
// 安装element-ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.prototype.$preImg="http://localhost:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
