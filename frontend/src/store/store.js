import { configureStore } from '@reduxjs/toolkit'
import userSclice from './sclice/user/userSclice'
import messageReducer from './sclice/message/message.slice'
import  socketReducer from './sclice/socket/socket.slice'

export const store = configureStore({
  reducer: {
    userSclice,
    messageReducer,
    socketReducer
  },
  middleware:(getDefaultMiddleware)=>{
    return(
      getDefaultMiddleware({
      serializableCheck:{
        ignoredPaths:["socketReducer.socket"]
      }
    }))
  }
})