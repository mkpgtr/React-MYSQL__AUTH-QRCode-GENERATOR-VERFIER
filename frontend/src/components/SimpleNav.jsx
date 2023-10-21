import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeUserFromLocalStorage } from '../utils/localStorage'
import { clearUserFromState } from '../features/userSlice'
import { useDispatch } from 'react-redux'

const SimpleNav = () => {

    
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className='w-full   flex items-center'>
        <ul className='flex w-[100%] justify-center gap-10 p-4'>
            <Link to='/createQR'>
            <li className='text-2xl font-bold'>Create QrCode</li>
            
            </Link>
            <Link to='/allQRs'>
            <li className='text-2xl font-bold'>All QrCodes</li>
            </Link>

            <Link>
            <span className='text-2xl text-blue-500 font-bold' onClick={()=>{
        removeUserFromLocalStorage();
        dispatch(clearUserFromState());
        navigate('/login');
      }} >Logout</span>
            </Link>

           
            
        </ul>
        
    </div>
  )
}

export default SimpleNav