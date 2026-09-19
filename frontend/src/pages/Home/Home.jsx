import React, { useEffect } from 'react'
import UserSideBar from './UserSideBar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initialzeSocket, setOnlineUsers } from '../../store/sclice/socket/socket.slice'
import { setNewMessage } from '../../store/sclice/message/message.slice'

const Home = () => {

  const {isAuthenticated,userProfile}=useSelector(state=>state.userSclice)
  const {socket}=useSelector(state=>state.socketReducer)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(!isAuthenticated) return;
    dispatch(initialzeSocket(userProfile?._id))
  },[isAuthenticated])


  useEffect(()=>{
if(!socket) return;
socket.on('onlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
    })

socket.on('newMessage',(message)=>{
          dispatch(setNewMessage(message))
    })

    return ()=>{
      socket.close()
    }
  },[socket])
  return (
    <div className='flex'>
      <UserSideBar/>
      <MessageContainer/>
    </div>
  )
}

export default Home