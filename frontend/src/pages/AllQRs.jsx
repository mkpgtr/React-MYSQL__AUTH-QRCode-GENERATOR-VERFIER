import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteQrCode, getAllQrCodes, toggleRefresh } from '../features/qrCodesSlice';


const AllQRs = () => {

    const {qrCodes,needsARefresh} = useSelector(state=>state.qrCodes);


    const navigate = useNavigate()

 
  
const dispatch = useDispatch()

useEffect(()=>{
if(needsARefresh){
    dispatch(getAllQrCodes())
    dispatch(toggleRefresh())
}
},[needsARefresh])

    

  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>QrCode</th>
      
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
   

      {qrCodes.length > 0 ?
      qrCodes.map((qrCode)=>{
        return <tr   className='hover:cursor-pointer'>
 <th>{qrCode?.id}</th>
        <div className='flex items-center '>
            <img src={qrCode?.imageLink} alt="" onClick={()=>navigate(`/${qrCode?.id}`)}/>
        <button className="btn btn-secondary" onClick={()=>dispatch(deleteQrCode(qrCode?.id))}>Delete</button>
        </div>

        </tr>
      })
      : <h2 className='text-2xl font-bold'>
        No Qrs To Show
      </h2>
      
      }
    
    </tbody>
  </table>
</div>
    </div>
  )
}

export default AllQRs