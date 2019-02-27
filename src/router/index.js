import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/comment/category/:category',
      name: 'commentByCategory',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: {name: 'commentByCategory', params: {category: 'react'}},
      name: 'Index',
      component: HelloWorld
    },
  ]
})
