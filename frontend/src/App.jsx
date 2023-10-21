import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateQR from './pages/CreateQR'
import AllQRs from './pages/AllQRs'
import SingleQr from './pages/SingleQr'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useSelector(state=>state.user)

  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Routes>
    <Route path='/' element={<ProtectedRoute> <Home /></ProtectedRoute>}>

      <Route path='createQR' element={<CreateQR />} />
      <Route path='allQRs' element={<AllQRs />} />
      <Route path='/:qrId' element={<SingleQr />} />
      </Route>
    <Route path='/login' element={<Login />}/>
    <Route path='/register'  element={<Register />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
