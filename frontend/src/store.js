import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import qrCodesSlice from './features/qrCodesSlice'



export default configureStore({
  reducer: {
    user : userSlice,
    qrCodes : qrCodesSlice,
  }
})

// Action creators are generated for each case reducer function
