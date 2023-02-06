"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _default = (0, _vuex.createStore)({
  state: {
    errorMessage: '',
    error: false
  },
  getters: {},
  mutations: {
    setErrorMessage: function setErrorMessage(state, str) {
      state.errorMessage = str;
    },
    setError: function setError(state, value) {
      state.error = value;
    }
  },
  actions: {},
  modules: {}
});

exports.default = _default;