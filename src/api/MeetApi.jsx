import axios from 'axios'
import { baseURL } from '../configData'

const meetURL = `${baseURL}meets`

const axiosInstance = axios.create({ baseURL: meetURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['ngrok-skip-browser-warning'] = 'any'
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 符合自定義條件
export const meetApi = async (payload) => {
  const { HouseId, ConditionId } = payload
  try {
    const res = axiosInstance.post(`${meetURL}`, { HouseId, ConditionId })
    return res
  } catch (error) {
    console.error('[Meet Failed]: ', error)
    return error.response
  }
}

// 取消符合自定義條件
export const notMeetApi = async (payload) => {
  const { id } = payload
  try {
    const res = axiosInstance.delete(`${meetURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Not Meet Failed]: ', error)
    return error.response
  }
}
