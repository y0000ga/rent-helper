import axios from 'axios'
import { baseURL } from '../configData'

const usersURL = `${baseURL}users`

const axiosInstance = axios.create({ baseURL: usersURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['ngrok-skip-browser-warning'] = 'any'
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
    // res.status === 200
    // res.data = {
    //   token: 'eyJhbGciOi',
    //   user: {
    //     account: 'bbbbbbbbbc',
    //     createdAt: '2023-01-03T11:23:53.629Z',
    //     hasLineToken: false,
    //     id: 14,
    //     name: 'bbc',
    //     updatedAt: '2023-01-03T11:23:53.629Z',
    //   },
    // }
  } catch (error) {
    console.error('[User Signup Failed]: ', error)
    return error.response
    // error.response.status === 400
    // error.response.data.message === '已經註冊過的帳號'
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
