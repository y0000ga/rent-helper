import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../configData'
import Swal from 'sweetalert2'

const conditionURL = `${baseURL}conditions`

const axiosInstance = axios.create({ baseURL: conditionURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 取得所有自定義條件
export const getAll = createAsyncThunk('setting/getAll', async () => {
  try {
    const res = await axiosInstance.get(`${conditionURL}`)
    return res
  } catch (error) {
    console.error('[Condition Get All Failed]: ', error)
    return error.response
  }
})
// 新增自定義條件
export const createCondition = createAsyncThunk(
  'setting/createCondition',
  async (payload) => {
    const { name } = payload
    try {
      const res = await axiosInstance.post(`${conditionURL}`, { name })
      return res
    } catch (error) {
      console.error('[Condition Create Failed]: ', error)
      return error.response
    }
  }
)
// 刪除自定義條件
export const deleteCondition = createAsyncThunk(
  'setting/deleteCondition',
  async (payload) => {
    const { id } = payload
    try {
      const res = await axiosInstance.delete(`${conditionURL}/${id}`)
      return res
    } catch (error) {
      console.error('[Condition Remove Failed]: ', error)
      return error.response
    }
  }
)

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    conditions: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.conditions = action.payload.data.conditions
    })
    builder.addCase(createCondition.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { name } = action.payload.data.condition
        const isExisted = state.conditions.includes(name)
        if (isExisted === false) {
          state.conditions.unshift(action.payload.data.condition)
        }
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: `${action.payload.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
    builder.addCase(deleteCondition.fulfilled, (state, action) => {
      const { id } = action.payload.data.condition
      state.conditions = state.conditions.filter((data) => data.id !== id)
    })
  },
  reducers: {
    clearSettingInfo(state) {
      state.conditions = []
    },
  },
})

export const settingActions = settingSlice.actions
export default settingSlice.reducer
