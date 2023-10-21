const CustomError = require("../errors/custom-error");
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new CustomError('Authentication invalid',401);
    }
    const token = authHeader.split(' ')[1];
    
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
      next();
    } catch (error) {
      if(error.message==='jwt malformed'){
      return  res.status(400).json({message:"jwt is not valid"})
      }
      
      res.status(500).json({message:"some error occured please try again later"})
      // throw new CustomError('Authentication invalid',401);
    }
  };

module.exports = auth