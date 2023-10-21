import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReadQR from './ReadQR'

const SingleQr = () => {

    const params = useParams()
   const {qrCodes}  = useSelector(state=>state.qrCodes)

    const qrId = params.qrId

    console.log(qrId)

    console.log(qrCodes)


    const [qrItem,setQrItem] = useState(qrCodes.find((qrCode)=>{
        return qrCode.id===parseInt(qrId)
    }))


    



   
  return (
    <div className='w-full'>
        <div className='flex items-center  w-[40rem] border border-blue-400 mx-auto'>

        <div>
            <img src={qrItem?.imageLink} alt=""/>
            <a href={qrItem?.imageLink} download={'qrImage.png'} className="btn btn-primary">Download</a>
        </div>
    <div className='w-[20rem]  ms-auto h-[10rem]'>

            <ReadQR />
    </div>
        </div>
    </div>
  )
}

export default SingleQr