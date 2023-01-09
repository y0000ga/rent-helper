import axios from 'axios'
import { baseURL } from '../configData'

const usersURL = `${baseURL}users`

const axiosInstance = axios.create({ baseURL: usersURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 使用者註冊
export const userSignupApi = async (payload) => {
  const { name, account, password, checkPassword } = payload
  try {
    const res = await axiosInstance.post(`${usersURL}`, {
      name,
      account,
      password,
      checkPassword,
    })
    return res
  } catch (error) {
    console.error('[User Signup Failed]: ', error)
    return error.response
  }
}

// 使用者登入
export const userLoginApi = async (payload) => {
  const { account, password } = payload
  try {
    const res = await axiosInstance.post(`${usersURL}/login`, {
      account,
      password,
    })
    return res
  } catch (error) {
    console.error('[User Login Failed]: ', error)
    return error.response
  }
}
