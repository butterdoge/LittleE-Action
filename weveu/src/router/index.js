import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Photo from '../views/Photo.vue'
import Video from '../views/Video.vue'
import Word from '../views/Word.vue'
import Quiz from '../views/Quiz.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/city/:cityname',
    name:'cityBoard',
    components:{
      Photo:Photo,
      Info:Word,
      Video:Video,
      Quiz:Quiz,
    },
  }
]

const router = new VueRouter({
  routes,
  // scrollBehavior(){
  //   return {x:0,y:100};
  // }
})

export default router
