import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser, toggleRegistrationSuccess } from '../features/userSlice'
import {useNavigate} from 'react-router-dom'
const defaultLoginObject = {
  email : '',
  password : ''
}
const Login = () => {

  const dispatch = useDispatch()

  const {user:userInState,registrationSuccess} = useSelector(state=>state.user)


  const navigate =  useNavigate()

  const [user,setUser] = useState(defaultLoginObject)

  const handleChange = (e)=>{

    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    const {email,password} = user
    dispatch(loginUser({email,password}))
  }

  useEffect(()=>{

    // ! turn the switch off
    if(registrationSuccess){
      dispatch(toggleRegistrationSuccess())
    }
    if(userInState?.userUsername){
      navigate('/')
    }
  },[userInState])

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form action="" className='flex flex-col gap-2 border border-primary p-8 rounded-xl' onSubmit={handleSubmit}>

        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold' >Email</label>
        <input type='text' className='input input-bordered' name='email' onChange={handleChange} placeholder='Email' />

        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold'>Password</label>
        <input type='text' className='input input-bordered' name='password' onChange={handleChange} placeholder='Password' />

        </div>
        <div className='flex flex-col gap-2'>
        <button type='submit' className='btn btn-primary' > Submit </button>

        </div>
      </form>
    </div>
  )
}

export default Login