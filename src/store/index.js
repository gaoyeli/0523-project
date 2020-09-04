import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import actions from "./actions"
import { state, mutations, getters } from "./mutations"
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import cate from "./modules/cate"
import spec from "./modules/spec"
import banner from "./modules/banner"
import goods from "./modules/goods"
import user from "./modules/user"
import member from "./modules/member"
import seckill from "./modules/seckill"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        role,
        manage,
        cate,
        spec, 
        banner,
        goods,
        user,
        member,
        seckill
    }
})