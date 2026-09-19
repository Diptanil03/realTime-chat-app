import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/sclice/message/message.thunk';

const SendMessage = () => {
    const [message,setMessage]=useState('')
    const dispatch=useDispatch()
    const {selectedUser}=useSelector(state=>state.userSclice)

    const handleSendMessage=async()=>{
       const response=await dispatch(sendMessageThunk({message,receiverId:selectedUser?._id}))
       if(response) setMessage('');
    }
  return (
    <>
        <div className='w-full px-5 py-3 flex gap-2.5'>
          <input type="text" placeholder="Type message here..." className="input input-primary w-full" onChange={(e)=>setMessage(e.target.value)}/>
          <button onClick={handleSendMessage} className="btn btn-outline btn-primary">
            <IoIosSend className='h-[30px] w-[30px]'/>
          </button>
        </div>
    </>
  )
}

export default SendMessage