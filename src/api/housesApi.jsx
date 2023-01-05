import axios from 'axios'
import { baseURL } from '../configData'

const housesURL = `${baseURL}houses`

const axiosInstance = axios.create({ baseURL: housesURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['ngrok-skip-browser-warning'] = 'any'
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增收藏物件 OK
export const housesCreateApi = async (payload) => {
  const { externalId } = payload
  try {
    const res = await axiosInstance.post(`${housesURL}`, { externalId })
    return res
  } catch (error) {
    console.error('[Houses Create Failed]: ', error)
    return error.response
  }
}

// 取得全部收藏物件
export const housesAllGetApi = async (payload) => {
  const { page, filter } = payload
  try {
    const res = await axiosInstance.get(
      `${housesURL}?page=${page}&filter=${filter}`
    )
    return res
  } catch (error) {
    console.error('[Houses All Get Failed]: ', error)
    return error.response
  }
}

// 取得單一物件

export const housesOneGetApi = async (payload) => {
  const { id } = payload
  try {
    const res = await axiosInstance.get(`${housesURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Houses One Get Failed]: ', error)
    return error.response
  }
}

// 編輯單一物件評論
export const housesEditCommentApi = async (payload) => {
  const { id, comment } = payload
  try {
    const res = await axiosInstance.put(`${housesURL}/${id}/comment`, {
      comment,
    })
    return res
  } catch (error) {
    console.error('[Houses Edit Comment Failed]: ', error)
    return error.response
  }
}

// 刪除單一物件
export const housesDeleteApi = async (payload) => {
  const { id } = payload
  try {
    const res = await axiosInstance.delete(`${housesURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Houses Delete Failed]: ', error)
    return error.response
  }
}
