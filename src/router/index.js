import Vue from 'vue'
import Router from 'vue-router'
import ListPost from '@/components/ListPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListPost',
      component: ListPost
    }
  ]
})
