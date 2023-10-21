import React, { useEffect, useState } from 'react'
import QRCode from "qrcode";
import {Link, redirect, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createQrCode, getAllQrCodes, toggleJWTValidity } from '../features/qrCodesSlice';
import { clearUserFromState } from '../features/userSlice';

const CreateQR = () => {
    const [data, setData] = useState('No result');
    const {lastCreatedQr} = useSelector(state=>state.qrCodes)
    const [imageLink, setImage] = useState('');
    const [text,setText] = useState('')
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const {isJWTInvalid} = useSelector(state=>state.qrCodes)

    useEffect(()=>{
      if(isJWTInvalid){
        navigate('/login')
        dispatch(clearUserFromState())
        dispatch(toggleJWTValidity())
      }
    },[isJWTInvalid])

    const handleSaveToDb = ()=>{
      dispatch(createQrCode({imageLink,text}))
      setText('')
      setImage('')
    }

    useEffect(()=>{
      dispatch(getAllQrCodes())
      
    },[lastCreatedQr])


    const generateQRCode = async(text)=>{

        const inputText = text || 'test text here'
        try {
            const response = await QRCode.toDataURL(inputText)
            setImage(response)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>

<div className='max-w-[40rem] mx-auto rounded-xl border'>
  <>
  <input type="text" className='input input-bordered' value={text} onChange={(e)=>setText(e.target.value)}/>
  <button className="btn btn-primary" onClick={()=>generateQRCode(text)}>
        Generate QR CODE
    </button>
  </>
    <div className="max-w-[20rem]">
        <img src={imageLink} className='w-[100%]' alt="" />

<div className="flex justify-around items-center">
{imageLink && <a href={imageLink} download='qr.png' className='hover:text-blue-600 text-blue-800 hover:scale-150 transition'>Download</a> }
{imageLink && <span className="cursor-pointer hover:text-blue-600 text-blue-800 hover:scale-150 transition" onClick={handleSaveToDb}>SAVE TO DB</span> }
</div>
        
    </div>
</div>
    </div>
  )
}

export default CreateQR