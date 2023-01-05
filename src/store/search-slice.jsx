import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchCollection: [
    {
      title: '1號',
      region: '台北市',
      section: ['信義區', '南港區', '松山區', '大安區', '中山區'],
      kind: ['整層住家', '獨立套房', '雅房'],
      shape: ['公寓'],
      price: [10000, 15000],
      area: [15, 20],
      addition: '可寵',
    },
  ],
  currentSearch: {
    title: '',
    region: '',
    section: [],
    kind: [],
    shape: [],
    price: [],
    area: [],
    addition: '',
  },
  isSearchShown: true,
}

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setIsSearchShown(state) {
      state.isSearchShown = !state.isSearchShown
    },
    removeSearchCondition(state, action) {
      const removeItem = action.payload
      state.searchCollection = state.searchCollection.filter(
        (data) => data.title !== removeItem
      )
    },
  },
})

export const searchActions = searchSlice.actions

export default searchSlice.reducer
