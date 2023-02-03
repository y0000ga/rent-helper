import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './room-slice'
import searchSlice from './search-slice'
import settingSlice from './setting-slice'

const store = configureStore({
  reducer: {
    search: searchSlice,
    setting: settingSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
})

export default store
