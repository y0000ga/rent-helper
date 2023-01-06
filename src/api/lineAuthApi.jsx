import axios from 'axios'
import { baseURL } from '../configData'

const lineAuthURL = `${baseURL}lineAuth`

const axiosInstance = axios.create({ baseURL: lineAuthURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['ngrok-skip-browser-warning'] = 'any'
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const lineAuthGetApi = async () => {
  try {
    const res = await axiosInstance.get(`${lineAuthURL}`)
    return res
  } catch (error) {
    console.error('[Line Auth Get Failed]: ', error)
    return error.response
  }
}
