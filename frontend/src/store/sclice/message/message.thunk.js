import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../../components/utilities/axiosinstance.js'

export const sendMessageThunk = createAsyncThunk(
  'message/send',
  async ({receiverId,message},{rejectWithValue}) => {
    try {
      const response= await axiosInstance.post(`/message/send/${receiverId}`,{
        message
      })

      // console.log(response)
      return response.data
    } catch (error) {
      // console.log(error?.response?.data?.message)

      const errorOutput=error?.response?.data?.message

      toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)


export const getMessageThunk = createAsyncThunk(
  'message/get-messages',
  async ({otherParticipantId},{rejectWithValue}) => {
    try {
      const response= await axiosInstance.get(`/message/get-messages/${otherParticipantId}`)

      // console.log(response)
      return response.data
    } catch (error) {
      // console.log(error?.response?.data?.message)

      const errorOutput=error?.response?.data?.message

      toast.error(errorOutput)

      return rejectWithValue(errorOutput)
    }
  },
)

