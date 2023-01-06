import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchCollection: [
    {
      name: '1號',
      region: '台北市',
      sections: ['信義區', '南港區', '松山區', '大安區', '中山區'],
      kind: '整層住家',
      shape: '公寓',
      minPrice: 10000,
      maxPrice: 20000,
      minArea: 15,
      maxArea: 20,
      notCover: '排除頂樓加蓋',
    },
  ],
  currentSearch: {
    name: '',
    region: '',
    sections: [],
    kind: '',
    shape: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    notCover: '',
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
