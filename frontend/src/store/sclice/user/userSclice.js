import { createSlice } from '@reduxjs/toolkit'
import {loginUserThunk , registerUserThunk ,logoutUserThunk, getUserProfileThunk, getOtherProfilesThunk} from './user.thunk'


export const userSclice=createSlice({
    name:'email',
    initialState:{
        isAuthenticated:false,
        userProfile:null,
        buttonLoading:false,
        screenLoading:true,
        otherUsers:null,
        selectedUser:JSON.parse(localStorage.getItem("selectedUser"))
    },
    reducers:{
        setSelectedUser:(state,action)=>{
          localStorage.setItem("selectedUser",JSON.stringify(action.payload))
          state.selectedUser=action.payload
        }
    },
    extraReducers: (builder) => {
      //*LOGIN USER*//

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUserThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.buttonLoading=true
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action.payload?.user)
      state.userProfile=action.payload?.user
      state.isAuthenticated=true
      state.buttonLoading=false
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.buttonLoading=false
    });


    // REGISTER USER //
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(registerUserThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.buttonLoading=true
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action.payload?.user)
      state.userProfile=action.payload?.user
      state.isAuthenticated=true
      state.buttonLoading=false
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.buttonLoading=false
    });



    // LOGOUT USER //
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.buttonLoading=true
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action.payload?.user)
      state.userProfile=null
      state.otherUsers=null
      state.selectedUser=null
      state.buttonLoading=false
      state.isAuthenticated=false
      localStorage.clear()
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.buttonLoading=false
    });


    // GET USER PROFILE //
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.screenLoading=true
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action?.payload?.responseData)
      state.screenLoading=false
      state.isAuthenticated=true
      state.userProfile=action?.payload?.responseData
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.screenLoading=false
    });
    // GET OTHER USER PROFILE //
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getOtherProfilesThunk.pending, (state, action) => {
      // Add user to the state array
      // console.log('hello pending')
      state.screenLoading=true
    });
    builder.addCase(getOtherProfilesThunk.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log('hello fullfilled')
      // console.log(action?.payload?.responseData)
      state.screenLoading=false
      state.otherUsers=action?.payload?.responseData
    });
    builder.addCase(getOtherProfilesThunk.rejected, (state, action) => {
      // Add user to the state array
      // console.log('hello rejected')
      state.screenLoading=false
    });
  },

})

// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSclice.actions

export default userSclice.reducer