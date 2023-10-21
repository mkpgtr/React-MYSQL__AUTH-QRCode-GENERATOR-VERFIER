import React, { useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
const ReadQR = () => {

    const qrRef = useRef(null)

    const [file,setFile]= useState()
    const fileRef = useRef()
    const [data,setData] = useState(null)



  


  const handleChange = async(e)=>{
   const file =e.target.files[0]
   setFile(file)
   const result = await  QrScanner.scanImage(file)
   setData(result)
  }

  return (
    <div className='w-full'>
        <div className='flex flex-col'>
        <input type="file"  onChange={handleChange} accept='.png, .jpg, .jpeg'  ref={fileRef}/>
       

       <h1 >Text Content : <span className='text-2xl'>{data}</span></h1>
        </div>

    </div>
  )
}

export default ReadQR