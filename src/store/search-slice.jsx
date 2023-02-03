import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import axios from 'axios'
import { baseURL } from '../configData'

const searchesURL = `${baseURL}searches`
const usersURL = `${baseURL}users`

const axiosInstance = axios.create({ baseURL: searchesURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增搜尋條件
export const searchCreate = createAsyncThunk(
  'search/searchCreate',
  async (payload) => {
    const {
      name,
      keyword,
      region,
      sections,
      kind,
      shape,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      notCover,
    } = payload

    try {
      const res = await axiosInstance.post(`${searchesURL}`, {
        name,
        keyword,
        region,
        sections,
        kind,
        shape,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
        notCover,
      })
      return res
    } catch (error) {
      console.error('[Search Create Failed]: ', error)
      return error.response
    }
  }
)

// 取得全部搜尋條件名稱
export const searchGetAll = createAsyncThunk(
  'search/searchGetAll',
  async () => {
    try {
      const resSearch = await axiosInstance.get(`${searchesURL}`)
      const resLineAuth = await axiosInstance.get(`${usersURL}/lineAuth`)
      return { search: resSearch, lineAuth: resLineAuth }
    } catch (error) {
      console.error('[Search Get All Failed]: ', error)
      return error.response
    }
  }
)

// 編輯單一搜尋條件
export const searchEdit = createAsyncThunk(
  'search/searchEdit',
  async (payload) => {
    const {
      id,
      name,
      keyword,
      region,
      sections,
      kind,
      shape,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      notCover,
    } = payload
    try {
      const res = axiosInstance.put(`${searchesURL}/${id}`, {
        name,
        keyword,
        region,
        sections,
        kind,
        shape,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
        notCover,
      })
      return res
    } catch (error) {
      console.error('[Search Edit Failed]: ', error)
      return error.response
    }
  }
)

// 刪除單一搜尋條件
export const searchDelete = createAsyncThunk(
  'search/searchDelete',
  async (payload) => {
    const { id } = payload
    try {
      const res = axiosInstance.delete(`${searchesURL}/${id}`)
      return res
    } catch (error) {
      console.error('[Search Delete Failed]: ', error)
      return error.response
    }
  }
)

const initialState = {
  lineAuthUrl: '',
  searchCollection: [],
  currentSearch: {
    name: '',
    keyword: '',
    region: '台北市',
    sections: [],
    kind: '不限',
    shape: '不限',
    minPrice: 0,
    maxPrice: '',
    minArea: 0,
    maxArea: '',
    notCover: false,
  },
  isSearchUpdated: false,
  searchFormStatus: 'finish', // finish, createNew, edit, loading
  isSearchLoading: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(searchGetAll.pending, (state) => {
      state.isSearchLoading = true
    })
    builder.addCase(searchGetAll.fulfilled, (state, action) => {
      state.isSearchLoading = false
      state.lineAuthUrl = action.payload.lineAuth.data.link
      state.searchCollection = action.payload.search.data.searches
    })
    builder.addCase(searchDelete.fulfilled, (state) => {
      state.isSearchUpdated = !state.isSearchUpdated
    })
    builder.addCase(searchCreate.pending, (state) => {
      state.searchFormStatus = 'loading'
      state.isSearchLoading = true
    })
    builder.addCase(searchCreate.fulfilled, (state, action) => {
      state.isSearchUpdated = !state.isSearchUpdated
      if (action.payload.status !== 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: `${action.payload.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '條件組合新增成功',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      state.searchFormStatus = 'finish'
    })
    builder.addCase(searchEdit.pending, (state) => {
      state.searchFormStatus = 'loading'
      state.isSearchLoading = true
    })
    builder.addCase(searchEdit.fulfilled, (state) => {
      state.isSearchUpdated = !state.isSearchUpdated
      state.searchFormStatus = 'finish'
    })
  },
  reducers: {
    setSearchFormStatus(state, action) {
      state.searchFormStatus = action.payload
    },
    setIsSearchUpdated(state) {
      state.isSearchUpdated = !state.isSearchUpdated
    },
    setName(state, action) {
      state.currentSearch.name = action.payload
    },
    setKeyword(state, action) {
      state.currentSearch.keyword = action.payload
    },
    setRegion(state, action) {
      state.currentSearch.region = action.payload
    },
    setSections(state, action) {
      if (action.payload === null) {
        state.currentSearch.sections = []
        return
      }
      const existedIndex = state.currentSearch.sections.findIndex(
        (data) => data === action.payload
      )
      if (existedIndex === -1) {
        if (state.currentSearch.sections.length === 5) {
          return
        }
        state.currentSearch.sections = state.currentSearch.sections.concat(
          action.payload
        )
      } else {
        state.currentSearch.sections = state.currentSearch.sections.filter(
          (data) => data !== action.payload
        )
      }
    },
    setKind(state, action) {
      state.currentSearch.kind = action.payload
    },
    setShape(state, action) {
      state.currentSearch.shape = action.payload
    },
    setMinPrice(state, action) {
      state.currentSearch.minPrice = Math.round(action.payload)
    },
    setMaxPrice(state, action) {
      state.currentSearch.maxPrice = Math.round(action.payload)
    },
    setMinArea(state, action) {
      state.currentSearch.minArea = Math.round(action.payload)
    },
    setMaxArea(state, action) {
      state.currentSearch.maxArea = Math.round(action.payload)
    },
    setNotCover(state) {
      state.currentSearch.notCover = !state.currentSearch.notCover
    },
    clearCurrentSearch(state) {
      state.currentSearch = initialState.currentSearch
    },
    setCurrentSearch(state, action) {
      const { id } = action.payload
      const targetIndex = state.searchCollection.findIndex(
        (data) => data.id === id
      )
      state.currentSearch = state.searchCollection[targetIndex]
    },
    clearSearchInfo(state) {
      state.searchCollection = initialState.searchCollection
      state.currentSearch = initialState.currentSearch
      state.isSearchUpdated = initialState.isSearchUpdated
    },
  },
})

export const searchActions = searchSlice.actions

export default searchSlice.reducer
