import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,screenLoading}=useSelector(state=>state.userSclice)
    const navigate=useNavigate()

    console.log(isAuthenticated)
    useEffect(()=>{
        if(!screenLoading && !isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated,screenLoading])
  return (
    children
  )
}

export default ProtectedRoute