import Vue from 'vue'
import App from './App.vue'
import './assets/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.axios = Axios;

import discovery from './views/discovery'
import playlists from './views/playlists'
import songs from './views/songs'
import mvs from './views/mvs'
import result from './views/result'
import playlist from './views/playlist'
import mv from './views/mv'

let router = new VueRouter({
  routes: [
    { path:'/',redirect:'/discovery' },
    { path:'/discovery',component:discovery },
    { path:'/playlists',component:playlists },
    { path:'/songs',component:songs },
    { path:'/mvs',component:mvs },
    { path:'/result',component:result },
    { path:'/playlist',component:playlist },
    { path:'/mv',component:mv }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
