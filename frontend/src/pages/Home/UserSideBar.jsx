import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk,getOtherProfilesThunk } from '../../store/sclice/user/user.thunk';

const UserSideBar = () => {

  const dispatch=useDispatch()
  const {otherUsers,userProfile}=useSelector(state=>state.userSclice)
  const [searchValue,setSearchValue]=useState('')
  const[users,setUsers]=useState([])

  const handleLogout=async()=>{
    const response=await dispatch(logoutUserThunk())

    // console.log(response)
  }

  useEffect(()=>{
    if(!searchValue){
      setUsers(otherUsers)
    }else{
      setUsers(otherUsers.filter(user=>user.fullName.toLowerCase().includes(searchValue.toLowerCase())))
    }
  },[searchValue])

  useEffect(()=>{
    dispatch(getOtherProfilesThunk())
  },[])

  // console.log(users)
  return (
    <div className='max-w-[20rem] w-full backdrop-blur-md h-screen flex flex-col  border-r border-blue-300/10'>
        <div>
            <h1 className='text-blue-300 font-semibold tracking-wider text-xl mx-3 my-2'>CHIT CHAT</h1>
        </div>

        <div className='p-1'>
            <label className="input">
                <IoSearch className='h-[20px] w-[20px]'/>
                <input onChange={(e)=>setSearchValue(e.target.value)} type="search" className="grow" placeholder="Search" />
            </label>
        </div>

        <div className='h-full overflow-y-scroll p-3 flex flex-col gap-1'>
        {
          users?.map((userDetails)=>(
            <User key={userDetails._id} user={userDetails}/>
          ))
        }

        </div>

        <div className='h-[4rem] bg-blue-300 flex justify-between items-center px-3 py-3'>
          <div className=' flex gap-2 items-center'>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avater} />
            </div>
          </div>
            <h2 className='text-xm font-bold text-black'>{userProfile?.fullName}</h2>
          </div>

          <button className="btn btn-neutral" onClick={handleLogout}>Log Out</button>
        </div>
    </div>
  )
}

export default UserSideBar