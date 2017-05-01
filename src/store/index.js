import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginstate: false,
    user: {
      'loginname': '',
      'avatar_url': '',
      'id': '',
      'accesstoken': ''
    }
  },
  getters: {
    getLoginState: state => {
      return state.loginstate
    },
    loginstate: state => {
      return state.user
    }
  },
  actions: {
    LOGIN: function ({ commit }, userinfoobj) {
      commit('SET_USER_INFO', {userinfoobj})
    }
  },
  mutations: {
    SET_USER_INFO: (state, {userinfoobj}) => {
      state.loginstate = true
      state.user.loginname = userinfoobj.loginname
      state.user.avatar_url = userinfoobj.avatar_url
      state.user.id = userinfoobj.id
      state.user.accesstoken = userinfoobj.accesstoken
    }
  }
})
