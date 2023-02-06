import axios from 'axios'
axios.defaults.baseURL = 'https://sdaapi.glabazna.eu'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'
// import router from '../router/index.js'
import store from '../store/index.js'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}

export default {
  get (path) {
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    }).catch(() => {
      store.commit('setErrorMessage', 'Chyba při načítání dat.')
      store.commit('setError', true)
      // router.push('/error')
    })
  },

  post (path, body) {
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch(() => {
      store.commit('setErrorMessage', 'Chyba při ukládání dat do databáze.')
      // router.push('/error')
      store.commit('setError', true)

    })
  },
  put (path, body) {
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch(() => {
      store.commit('setErrorMessage', 'Chyba při editaci dat.')
      // router.push('/error')
      store.commit('setError', true)

    })
  },
  delete (path, body) {
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch(() => {
      store.commit('setErrorMessage', 'Chyba při mazání záznamu.')
      // router.push('/error')
      store.commit('setError', true)

    })
  }
}