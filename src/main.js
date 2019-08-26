import Vue from 'vue'
import App from '@/App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import router from "@/router/index.js"
import store from "@/store/index.js";
import api from "@/api/index.js"
import VueCookie from "vue-cookie"
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
Vue.use(ElementUI);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
    attempt: 1
})
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.use(VueCookie);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})