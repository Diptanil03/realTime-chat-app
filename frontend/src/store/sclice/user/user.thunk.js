import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../../components/utilities/axiosinstance.js'

const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({email,password},{rejectWithValue}) => {
    try {
      const response= await axiosInstance.post('/user/login',{
        email,
        password
      })

      console.log(response)
      toast.success("login successful")
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)

      const errorOutput=error?.response?.data?.message

      toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)


const registerUserThunk = createAsyncThunk(
  'user/register',
  async ({email,password,fullName,gender},{rejectWithValue}) => {
    try {
      const response= await axiosInstance.post('/user/register',{
        email,
        password,
        gender,
        fullName
      })

      console.log(response)
      toast.success("registation successful")
      return response.data
    } catch (error) {
      console.log(error)

      const errorOutput=error?.response?.data?.message

      toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)


const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_,{rejectWithValue}) => {
    try {
      const response= await axiosInstance.get('/user/logout')

      // console.log(response)
      toast.success("logout successful")
      return response.data
    } catch (error) {
      // console.log(error)

      const errorOutput=error?.message

      toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)

const getUserProfileThunk = createAsyncThunk(
  'user/getprofile',
  async (_,{rejectWithValue}) => {
    try {
      const response= await axiosInstance.get('/user/getprofile')

      // console.log(response)
      return response.data
    } catch (error) {
      // console.log(error)

      const errorOutput=error?.message

      // toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)

const getOtherProfilesThunk = createAsyncThunk(
  'user/otherusers',
  async (_,{rejectWithValue}) => {
    try {
      const response= await axiosInstance.get('/user/otherusers')

      // console.log(response)
      return response.data
    } catch (error) {
      // console.log(error)

      const errorOutput=error?.message

      // toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)

export {loginUserThunk,registerUserThunk,logoutUserThunk,getUserProfileThunk,getOtherProfilesThunk}