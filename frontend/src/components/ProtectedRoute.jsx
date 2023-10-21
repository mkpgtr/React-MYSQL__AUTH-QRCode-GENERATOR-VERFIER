import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(state=>state.user)

    console.log(user.userUsername)

    if(user.userUsername){
        return (
            <div>{children}</div>
          )
    }

  
    
    return <Navigate to='/login'/>

}

export default ProtectedRoute