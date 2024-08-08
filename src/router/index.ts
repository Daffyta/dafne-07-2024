import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import PokemonDetail from '../views/PokemonDetail.vue'
import Layout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'team', component: Team },
      { path: 'team/:id', component: PokemonDetail, props: true }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
