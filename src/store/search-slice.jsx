import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
  isSearchShown: false,
  isSearchUpdated: false,
  isEdit: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setIsSearchUpdated(state) {
      state.isSearchUpdated = !state.isSearchUpdated
    },
    getAllSearchCollection(state, action) {
      state.searchCollection = action.payload
    },
    createSearch(state, action) {
      state.searchCollection = state.searchCollection.unshift(action.payload)
    },
    setIsSearchShown(state) {
      state.isSearchShown = !state.isSearchShown
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
      const targetIndex = state.searchCollection.findIndex((data) => data.id === id)
      state.currentSearch = state.searchCollection[targetIndex]
    },
    setIsEdit(state,action) {
      state.isEdit = action.payload
    }
  },
})

export const searchActions = searchSlice.actions

export default searchSlice.reducer
