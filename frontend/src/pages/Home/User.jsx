import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from '../../store/sclice/user/userSclice'

const User = ({user}) => {
  const dispatch=useDispatch()
  const {selectedUser}=useSelector(state=>state.userSclice)
  const {onlineUsers}=useSelector(state=>state.socketReducer)
  const handleUserClick=()=>{
      dispatch(setSelectedUser(user))
  }
  return (
    <div onClick={handleUserClick} className={`flex gap-1 p-2 rounded-md cursor-pointer items-center hover:bg-gray-800 ${user?._id==selectedUser?._id && 'bg-gray-800'}`}>
        <div className={`avatar ${onlineUsers?.includes(user?._id)?'avatar-online':'avatar-offline'}`}>
        <div className="w-15 rounded-full">
        <img src={user?.avater} />
        </div>
        </div>
        <div className='flex flex-col'>
        <h2 className='text-ellipsis'>{user?.fullName}</h2>
        <p className='text-xs'>{user?.email}</p>
        </div>
    </div>
  )
}

export default User