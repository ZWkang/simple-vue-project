// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import lazy from './lib/lazyload/index.js'

Vue.config.productionTip = false

Vue.use(lazy, {
  background: true,
  backgroundTag: 'data-background',
  imgSrc: true,
  imgTag: 'data-src',
  parent: null,
  srcset: false,
  srcsetTag: 'data-srcset',
  delayTime: 200,
  rendered: function () { },
  deleleData: true,
  firstLoad: true
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
