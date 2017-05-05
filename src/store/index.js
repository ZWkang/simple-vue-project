import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: localStorage.getItem('islogin') || false,
    user: {
      'loginname': localStorage.getItem('loginname') || '',
      'avatar_url': localStorage.getItem('avatar_url') || '',
      'id': localStorage.getItem('id') || '',
      'accesstoken': localStorage.getItem('accesstoken') || 'e2d5e960-fcb8-4302-9a2a-9aa788cdb19d'
    }
  },
  getters: {
    getLoginState: state => {
      return state.islogin
    },
    loginstate: state => {
      return state.user
    }
  },
  actions: {
    LOGIN: function ({ commit }, userinfoobj) {
      commit('SET_USER_INFO', {userinfoobj})
    },
    LOGOUT: function ({ commit }) {
      commit('LOGOUT_CLEAR')
    }
  },
  mutations: {
    SET_USER_INFO: (state, {userinfoobj}) => {
      state.islogin = true
      state.user.loginname = userinfoobj.loginname
      state.user.avatar_url = userinfoobj.avatar_url
      state.user.id = userinfoobj.id
      state.user.accesstoken = userinfoobj.accesstoken
      localStorage.setItem('islogin', true)
      localStorage.setItem('loginname', userinfoobj.loginname)
      localStorage.setItem('avatar_url', userinfoobj.avatar_url)
      localStorage.setItem('id', userinfoobj.id)
      localStorage.setItem('accesstoken', userinfoobj.accesstoken)
    },
    LOGOUT_CLEAR: (state) => {
      state.islogin = false
      state.user.loginname = ''
      state.user.avatar_url = ''
      state.user.id = ''
      state.user.accesstoken = ''
      localStorage.setItem('islogin', false)
      localStorage.setItem('loginname', '')
      localStorage.setItem('avatar_url', '')
      localStorage.setItem('id', '')
      localStorage.setItem('accesstoken', '')
    }
  }
})
