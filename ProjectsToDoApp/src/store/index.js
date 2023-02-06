import { createStore } from 'vuex'

export default createStore({
  state: {
    errorMessage: '',
    error: false
  },
  getters: {
  },
  mutations: {
    setErrorMessage (state, str) {
      state.errorMessage = str
    },
    setError (state, value) {
      state.error = value
    }
  },
  actions: {
  },
  modules: {
  }
})
