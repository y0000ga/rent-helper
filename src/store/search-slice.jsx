import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchCollection: [
    {
      title: '1號',
      location: ['信義區', '南港區', '松山區', '大安區', '中山區'],
      type: ['整層住家', '獨立套房', '雅房'],
      building: ['公寓'],
      money: [10000, 15000],
      space: [15, 20],
      addition: '可寵',
    },
    {
      title: '2號',
      location: ['信義區', '南港區', '松山區', '大安區', '中山區'],
      type: ['整層住家', '獨立套房', '雅房'],
      building: ['公寓'],
      money: [10000, 15000],
      space: [15, 20],
      addition: '可寵',
    },
    {
      title: '3號',
      location: ['信義區', '南港區', '松山區', '大安區', '中山區'],
      type: ['整層住家', '獨立套房', '雅房'],
      building: ['公寓'],
      money: [10000, 15000],
      space: [15, 20],
      addition: '可寵',
    },
  ],
  currentSearch: {
    location: ['信義區', '南港區', '松山區', '大安區', '中山區'],
    type: ['整層住家', '獨立套房', '雅房'],
    building: ['公寓'],
    money: [10000, 15000],
    space: [15, 20],
    addition: '可寵',
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
    removeSearchCondtion(state, action) {
      const removeItem = action.payload
      state.searchCollection = state.searchCollection.filter((data) => data.title !== removeItem)
    },
  },
})

export const searchActions = searchSlice.actions

export default searchSlice.reducer
