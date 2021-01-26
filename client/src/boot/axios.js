import Vue from 'vue'
import axios from 'axios'

export default async () => {
  axios.defaults.baseURL = 'http://localhost:8000/api'
  Vue.prototype.$axios = axios
}
