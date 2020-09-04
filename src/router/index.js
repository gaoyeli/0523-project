import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)
//一级路由

const login = () => import("../pages/login/login")
const index = () => import("../pages/index/index")
//二级路由
const banner = () => import("../pages/banner/banner")
const classify = () => import("../pages/classify/classify")
const goods = () => import("../pages/goods/goods")
const manage = () => import("../pages/manage/manage")
const member = () => import("../pages/member/member")
const menu = () => import("../pages/menu/menu")
const role = () => import("../pages/role/role")
const seckill = () => import("../pages/seckill/seckill")
const spec = () => import("../pages/spec/spec")
const home = () => import("../pages/home/home")


//路由独享守卫判断
function beforeEnter(url, next) {
  store.state.user.info.menus_url.some(item => item == url) ? next() : next("/")
}

export const indexRoutes = [
  {
    path: "menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "role",
    component: role,
    name: "角色管理",
    beforeEnter(to, from, next) {
      beforeEnter("/role", next)
    }
  },
  {
    path: "manage",
    component: manage,
    name: "管理员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/manage", next)
    }
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类",
    beforeEnter(to, from, next) {
      beforeEnter("/classify", next)
    }
  },
  {
    path: "spec",
    component: spec,
    name: "商品规格",
    beforeEnter(to, from, next) {
      beforeEnter("/spec", next)
    }
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理",
    beforeEnter(to, from, next) {
      beforeEnter("/goods", next)
    }
  },
  {
    path: "banner",
    component: banner,
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      beforeEnter("/banner", next)
    }
  },
  {
    path: "member",
    component: member,
    name: "会员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/member", next)
    }
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      beforeEnter("/seckill", next)
    }
  },

]


const router = new Router({
  routes: [
    { path: "/login", component: login },
    {
      path: "/", component: index,
      children: [
        { path: "", component: home },
        ...indexRoutes
      ]
    }
  ]
})


//登录拦截
router.beforeEach((to, from, next) => {
  console.log(store.state.user.info);
  //登录 next
  if (to.path === "/login") {
    next();
    return;
  }
  //不是登录  判断是否登录过，登陆过，跳转，若果没有登录过，强制登录
  if (store.state.user.info.id) {
    next();
    return;
  }
  //去的不是登录，去登录
  next("/login")
})
export default router