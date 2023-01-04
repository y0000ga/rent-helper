import axios from 'axios'
import { baseURL } from '../configData'

const useApi = ({ type }) => {
  const typeURL = `${baseURL}${type}`
  const axiosInstance = axios.create({baseURL: typeURL})
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })
}
