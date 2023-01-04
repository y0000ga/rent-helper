import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './room-slice'
import searchSlice from './search-slice'
import settingSlice from './setting-slice'
import userSlice from './user-slice'

const store = configureStore({
  reducer: {
    search: searchSlice,
    setting: settingSlice,
    room: roomSlice,
    user: userSlice,
  },
})

export default store
