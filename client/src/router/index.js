import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Input from '@/components/Input'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/input',
      name: 'input',
      component: Input
    }
  ]
})
