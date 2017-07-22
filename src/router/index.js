import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Post from '@/components/Post'
import login from '@/components/Login'
import self from '@/components/Self'
import about from '@/components/About'
import detail from '@/components/Detail'
import list from '@/components/List'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/post/:topicid',
      name: 'editpost',
      component: Post
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'lists',
      component: list
    },
    {
      path: '/list/:artcle',
      name: 'list',
      component: list
    },
    {
      path: '/user/:loginname',
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
