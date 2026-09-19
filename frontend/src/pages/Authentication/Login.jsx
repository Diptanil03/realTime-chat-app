import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {loginUserThunk} from '../../store/sclice/user/user.thunk';



const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const {isAuthenticated}=useSelector(state=>state.userSclice)

  const [LoginFormData,setLoginFormData]=useState({
    email:'',
    password:''
  });

  useEffect(()=>{
    if(isAuthenticated) navigate('/');
  },[isAuthenticated])

  const handleInputChange=(e)=>{
    setLoginFormData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  };

  const handleLogin=async()=>{
    const response=await dispatch(loginUserThunk(LoginFormData))
    if(response?.payload?.success){
        navigate('/')
    }

  // console.log(response)
   

  }
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='max-w-[40rem]'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" name='email' onChange={handleInputChange} value={LoginFormData.email} className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" name='password' onChange={handleInputChange} value={LoginFormData.password} className="input" placeholder="Password" />

  <button className="btn btn-primary mt-4" onClick={handleLogin}>Login</button>
  <p className='mt-4 text-sm'>Don't have an account ? <Link to={'/signup'} className='text-blue-400 underline'>Sign Up</Link></p>
</fieldset>
</div>
    </div>
  )
}

export default Login