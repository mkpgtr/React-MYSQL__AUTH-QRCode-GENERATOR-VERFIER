const sendSuccessResponse = (message,data,res) =>{


    return res.json({message,data})
}

const sendErrorResponse = (error,res)=>{
    return res.json({message:error.message,statusCode : error.statusCode});
}

module.exports = {sendSuccessResponse,sendErrorResponse}