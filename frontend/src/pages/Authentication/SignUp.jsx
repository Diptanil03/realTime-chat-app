import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUserThunk } from '../../store/sclice/user/user.thunk';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [signUpFormData,setSignUpFormData]=useState({
    fullName:'',
    email:'',
    password:'',
    confirmPassword:'',
    gender:'male'
  });

  const dispatch=useDispatch()
  const navigate=useNavigate()
   const {isAuthenticated}=useSelector(state=>state.userSclice)


  useEffect(()=>{
      if(isAuthenticated) navigate('/');
    },[isAuthenticated])
  
  const handleInputChange=(e)=>{
    setSignUpFormData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  };

 const handleSignUp=async()=>{
  if(signUpFormData.password!=signUpFormData.confirmPassword){
    return toast.error("Password does not match")
  }
    const response=await dispatch(registerUserThunk(signUpFormData))

    if(response?.payload?.success){
        navigate('/')
    }
  }
  return (
    <div className='w-full flex justify-center items-center h-screen'>
    <div className='max-w-[40rem] w-[20rem]'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[100%] border p-4">
  <legend className="fieldset-legend">Sign Up</legend>

  <label className="label">Full Name</label>
  <input type="text" name='fullName' onChange={handleInputChange} value={signUpFormData.fullName} className="input w-[100%]" placeholder="Full Name" />

  <label className="label">Email</label>
  <input type="email" name='email' onChange={handleInputChange} value={signUpFormData.email} className="input w-[100%]" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" name='password' onChange={handleInputChange} value={signUpFormData.password} className="input w-[100%]" placeholder="Password" />

  <label className="label">Confirm Password</label>
  <input type="password" name='confirmPassword' onChange={handleInputChange} value={signUpFormData.confirmPassword} className="input w-[100%]" placeholder="Confirm Password" />
  
  <label className="label flex gap-1.5">Gender
  {/* <input type="text" name='gender' onChange={handleInputChange} value={signUpFormData.gender} className="input w-[100%]" placeholder="male / female / others" /> */}
  <label htmlFor='male' className="label">
  <input type="radio" id='male' name="gender" value='male' onChange={handleInputChange} className="radio radio-primary" defaultChecked />
  Male</label>
  <label htmlFor='female' className="label">
<input type="radio" id='female' name="gender" value='female' onChange={handleInputChange} className="radio radio-primary" />
Female</label>

</label>

  <button className="btn btn-primary mt-4" onClick={handleSignUp}>Sign Up</button>
  <p className='mt-4 text-sm'>Already have an account ? <Link to={'/login'} className='text-blue-400 underline'>Log In</Link></p>
</fieldset>
</div>
    </div>
  )
}

export default SignUp