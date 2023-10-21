const pool  = require("../db/config")
const CustomError = require("../errors/custom-error")


const createQrCode = async(req,res)=>{

   try {
    const {text,imageLink} = req.body

    const getQrTexts = 'select text from qrCodes where text=?'
    const getQrTextsValues = [text] 

    const sqlgetQrTextsExecute = await pool.query(getQrTexts,getQrTextsValues)

    if(sqlgetQrTextsExecute[0][0]?.['text']){
        throw new CustomError('QR Code Already Exists. Please enter new text & generate new Code',409)
    }



    const sqlInsertQuery = 'INSERT INTO qrCodes (text, imageLink) VALUES (?, ?)'
    const values = [text,imageLink]

    const sqlExecutte = await pool.query(sqlInsertQuery,values)

    res.status(201).json({message:"qr code saved to db successfully",qr:{text}})
   } catch (error) {
    console.log(error)
    res.status(error.statusCode).json({message:error.message})
   }

}

const getAllQrCodes = async(req,res)=>{

    try {
        const sqlCommand = 'select id,imageLink from qrCodes';
        const sqlCommandExecute = await pool.query(sqlCommand)

        res.status(200).json({data:sqlCommandExecute[0]})
        
    } catch (error) {
        const statusCODE = error.statusCode || 500;
        const errorMessage = error.message;
        res.status(statusCODE).json({message:errorMessage});
    }
}

const deleteQrCode = async(req,res)=>{


    try {
        const toDelete = req.params.id;

        const sqlCommand = 'delete from qrCodes where id=?'
        const values = [toDelete]
        const executeSql = await pool.query(sqlCommand,values)
        console.log(executeSql)

        res.json({message:'deleted successfully'})
    } catch (error) {
        const statusCODE = error.statusCode || 500;
        const errorMessage = error.message;
        res.status(statusCODE).json({message:errorMessage});
    }

}



module.exports = {createQrCode,getAllQrCodes,deleteQrCode}