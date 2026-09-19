import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk';


export const messageSclice=createSlice({
    name:'message',
    initialState:{
        buttonLoading:false,
        messages:null,
        screenLoading:false
    },
    reducers:{
        setNewMessage:(state,action)=>{
          const oldMessages=state.messages ?? []
          state.messages=[...oldMessages,action.payload]
        }
    },
    extraReducers: (builder) => {
     
     
        //*SEND MESSAGE*//
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.buttonLoading=true
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action?.payload)
      state.messages=[...state.messages,action?.payload?.responseData]
      state.buttonLoading=false
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.buttonLoading=false
    });


        //*GET MESSAGE*//
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMessageThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.buttonLoading=true
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action.payload)
      state.messages=action?.payload?.responseData?.messages
      state.buttonLoading=false
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.buttonLoading=false
    });


  },

})

// Action creators are generated for each case reducer function
export const { setNewMessage } = messageSclice.actions

export default messageSclice.reducer