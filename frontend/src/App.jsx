import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Authentication/Login'
import SignUp from './pages/Authentication/SignUp'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { getOtherProfilesThunk, getUserProfileThunk } from './store/sclice/user/user.thunk'



function App() {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUserProfileThunk())
  },[])


const router=createBrowserRouter([
  {path:'/',element:(<ProtectedRoute>
    <Home/>
  </ProtectedRoute>)},
  {path:'/login',element:<Login/>},
  {path:'/signup',element:<SignUp/>}
])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </>
  )
}

export default App
