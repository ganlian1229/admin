import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

const router = createRouter()

//重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router
