import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/Goods'
import ratings from '@/components/Ratings'
import seller from '@/components/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'',redirect:'/goods'},
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller}
  ]
})
