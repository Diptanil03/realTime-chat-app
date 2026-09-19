import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'


export const socketSclice=createSlice({
    name:'socket',
    initialState:{
        socket:null,
        onlineUsers:null
    },
    reducers:{
        initialzeSocket:(state,action)=>{
            const socket=io(import.meta.env.VITE_URL,{
                query:{
                    userId:action.payload
                }
            }
            )
            state.socket=socket

        },

        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        }
    },
    extraReducers: (builder) => {
    
  },

})

// Action creators are generated for each case reducer function
export const { initialzeSocket, setOnlineUsers } = socketSclice.actions

export default socketSclice.reducer