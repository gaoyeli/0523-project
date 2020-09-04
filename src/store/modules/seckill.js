import { reqseckList } from "../../utils/request"
const state = {
    //分类列表
    list: []
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    }
}

const actions = {
    //请求
    reqListAction(context) {
        reqseckList({ istree: true }).then(res => {
            context.commit("changeList", res.data.list)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
