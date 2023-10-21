import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserFromState } from '../features/userSlice'
import { removeUserFromLocalStorage } from '../utils/localStorage'
import { Outlet, useNavigate } from 'react-router-dom'
import CreateQR from './CreateQR'
import ReadQR from './ReadQR'
import SimpleNav from '../components/SimpleNav'
import { getAllQrCodes } from '../features/qrCodesSlice'

const Home = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const navigate = useNavigate()
  

  useEffect(()=>{
    dispatch(getAllQrCodes())
  },[])
  return (
    <div>
         <SimpleNav />
    {/* <div className="flex items-center justify-center mb-10">
    <h1 className='text-4xl'>Home</h1>
      <button className='btn mt-10 btn-primary' onClick={()=>{
        removeUserFromLocalStorage()
        dispatch(clearUserFromState())
        navigate('/login')
      }} >Logout</button>

    </div> */}
   
      <h1 className='text-center font-bold text-4xl mb-10'>Welcome, {user?.userFullName}</h1>
      
    <div className="flex align-items justify-center gap-3">
    <Outlet />
      {/* <ReadQR /> */}

    </div>
      
      
      </div>
  )
}

export default Home