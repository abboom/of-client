import axios from 'axios'

export const $http = axios.create({
  baseURL: '/api',
  timeout: 2000
})
