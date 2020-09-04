import {reqmemberList} from "../../utils/request"
const state = {
    //会员列表
    list: [],
   
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
}

const actions = {
    //请求
    reqRoleAction(context) {
        reqmemberList().then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeList", arr)
        })
    },
}
const getters = {
    list(state) {
        return state.list
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
