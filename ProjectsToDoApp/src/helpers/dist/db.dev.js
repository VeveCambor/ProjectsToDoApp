"use strict";

var _interopRequireDefault = require("/Users/tomik/projects/js4-final-project/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../store/index.js"));

_axios.default.defaults.baseURL = 'https://sdaapi.glabazna.eu';
_axios.default.defaults.headers.common['Content-Type'] = 'application/json';
_axios.default.defaults.headers.common.Accept = 'json'; // import router from '../router/index.js'

var checkUrl = function checkUrl(url) {
  return url.substr(0, 1) === '/' ? url : '/' + url;
};

var _default = {
  get: function get(path) {
    return (0, _axios.default)({
      method: 'get',
      url: checkUrl(path)
    }).then(function (response) {
      return response.data.data;
    }).catch(function () {
      _index.default.commit('setErrorMessage', 'Chyba při načítání dat.');

      _index.default.commit('setError', true); // router.push('/error')

    });
  },
  post: function post(path, body) {
    return (0, _axios.default)({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then(function (response) {
      return response.data.data;
    }).catch(function () {
      _index.default.commit('setErrorMessage', 'Chyba při ukládání dat do databáze.'); // router.push('/error')


      _index.default.commit('setError', true);
    });
  },
  put: function put(path, body) {
    return (0, _axios.default)({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then(function (response) {
      return response.data.data;
    }).catch(function () {
      _index.default.commit('setErrorMessage', 'Chyba při editaci dat.'); // router.push('/error')


      _index.default.commit('setError', true);
    });
  },
  delete: function _delete(path, body) {
    return (0, _axios.default)({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then(function (response) {
      return response.data.data;
    }).catch(function () {
      _index.default.commit('setErrorMessage', 'Chyba při mazání záznamu.'); // router.push('/error')


      _index.default.commit('setError', true);
    });
  }
};
exports.default = _default;