const express = require('express')

const app = express()
const cors = require('cors')

require('dotenv').config()


const authRoutes = require('./routes/auth')
const qrCodeRoutes = require('./routes/qrCodes')
const testRoutes = require('./routes/test')
const errorHandlerMiddleware = require('./middleware/error-handler')



app.use(cors())
app.use(express.json())



app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/qrCodes',qrCodeRoutes);
app.use('/api/v1/test',testRoutes);


app.use(errorHandlerMiddleware)

const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log('app listening on port 5000')
})

