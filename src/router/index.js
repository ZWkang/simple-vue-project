import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import topic from '@/components/topic'
import login from '@/components/Login'
import self from '@/components/Self'
import about from '@/components/About'
import detail from '@/components/Detail'
import list from '@/components/List'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: list
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/list/:artcle',
      name: 'list',
      component: list
    },
    {
      path: '/self/:loginname',
      name: 'self',
      component: self
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
