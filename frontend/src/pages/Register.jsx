import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

const defaultUserObject= {
  name : '',
  email : '',
  password : '',
}

const Register = () => {
  const dispatch = useDispatch()
  const {user:userInState,registrationSuccess} = useSelector(state=>state.user)
  const [user,setUser] = useState(defaultUserObject)
  const navigate = useNavigate()

  



  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})

    console.log(user)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    const {name,password,email,username} = user

    console.log(name,password,email)


    dispatch(registerUser({name,email,password,username}))
    console.log('from handle submit')

  }

  useEffect(()=>{
    if(registrationSuccess){
      navigate('/login')
    }
  },[registrationSuccess])

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form action="" className='flex flex-col gap-2 border border-primary p-8 rounded-xl lg:w-[20rem]' onSubmit={handleSubmit}>

      <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold'>Name</label>
        <input type='text' name='name' className='input input-bordered' placeholder='Name' onChange={handleChange}/>

        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold'>Email</label>
        <input type='text' name='email' className='input input-bordered' placeholder='Email' onChange={handleChange} />

        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold'>Username</label>
        <input type='text' name='username' className='input input-bordered' placeholder='Username' onChange={handleChange} />

        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor="" className='font-bold'>Password</label>
        <input type='password' name='password' className='input input-bordered' placeholder='Password' onChange={handleChange} />

        </div>
        <div className='flex flex-col gap-2'>
        <button type='submit' className='btn btn-primary' > Submit </button>

        </div>
      </form>
    </div>
  )
}

export default Register