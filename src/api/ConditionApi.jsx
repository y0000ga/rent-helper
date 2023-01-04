import axios from 'axios'
import { baseURL } from '../configData'

const conditionURL = `${baseURL}conditions`

const axiosInstance = axios.create({ baseURL: conditionURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['ngrok-skip-browser-warning'] = 'any'
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 取得所有自定義條件
export const conditionGetAllApi = async () => {
  try {
    const res = await axiosInstance.get(`${conditionURL}`)
    return res
  } catch (error) {
    console.error('[Condition Get All Failed]: ', error)
    return error.response
  }
}
// 新增自定義條件
export const conditionCreateApi = async (payload) => {
  const { name } = payload
  try {
    const res = await axiosInstance.post(`${conditionURL}`, { name })
    return res
  } catch (error) {
    console.error('[Condition Create Failed]: ', error)
    return error.response
  }
}
// 刪除自定義條件
export const conditionRemoveApi = async (payload) => {
  const { id } = payload
  try {
    const res = await axiosInstance.delete(`${conditionURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Condition Remove Failed]: ', error)
    return error.response
  }
}
