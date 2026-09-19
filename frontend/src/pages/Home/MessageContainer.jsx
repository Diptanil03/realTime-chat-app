import React, { useEffect } from 'react'
import User from './User'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/sclice/message/message.thunk';
import SendMessage from './SendMessage';
const MessageContainer = () => {
    const {selectedUser}=useSelector(state=>state.userSclice)
    const dispatch=useDispatch()
    const {messages}=useSelector(state=>state.messageReducer)

    useEffect(()=>{
      if(!selectedUser?._id) return;
      dispatch(getMessageThunk({otherParticipantId:selectedUser?._id}))
    },[selectedUser])
  return (
    <>
    {
      !selectedUser?(
        <div className='flex flex-col items-center justify-center gap-5 w-full'>
          <h2>Welcome to Chit Chat</h2>
          <p>please select a user to continue chat !</p>
        </div>
      ):(
         <div className='w-full flex flex-col'>
      <div className='p-3 border-b-2 border-blue-300/10'>
        <User user={selectedUser}/>
        </div>

        <div className='h-full overflow-y-auto p-3'>
          {messages?.map((message)=>{
            return(
                    <Message messageDetails={message} key={message._id}/>
            )
          })}
          
        </div>
            <SendMessage/>
    </div>
      )
    }
    </>
   
  )
}

export default MessageContainer