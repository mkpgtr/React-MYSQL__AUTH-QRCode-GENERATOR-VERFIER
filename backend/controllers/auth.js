const pool  = require("../db/config");
const CustomError = require("../errors/custom-error");
const { hashPassword, matchPassword } = require("../utils/hashPassword");

const jwt = require('jsonwebtoken')

const {isEmail} = require('validator');
const { sendSuccessResponse, sendErrorResponse } = require("../utils/responses");

const register = async(req,res)=>{

    console.log(req.body)
    
    
    // res.json({message:"shit happens"})
    try {
        const {username,password,name,email} = req.body;
        // ! check if both fields are present, else send error

        if(!username || !password || !email || !name){
            throw new CustomError('please provide all values',400)
        }
        // ! check if username already exists, if yes, then send error
        // ! hash password
        const hashedShit = await hashPassword(password);
        // ! save the user
        // ! create account sql 
          const createAccountSQL = 'insert into users (username,password,name,email) values( ?, ? , ?, ?)'; 

          const values = [username,hashedShit,name,email];

         
  
          const [result] = await pool.query(createAccountSQL,values);

          console.log(result)
        // ! send json & message
        res.status(201).json({data:result,message:"Account Created successfully"})
    } catch (error) {
        console.log(error)
        res.status(error?.statusCode).json({message:error.message})
    }
    }
    
const login = async(req,res)=>{
        
    console.log(req.body)
        

    try {
        const {email,password} = req.body
        const sqlUserInDB = `select email,password,id,username,name from users where email=?`
        const  sqlUserInDBValues = [email]
    
        const sqlQuery = await pool.query(sqlUserInDB,sqlUserInDBValues) 

        if(!sqlQuery[0][0]){
            throw new CustomError('user not found',404);

        }
        const {password:passInDb} = sqlQuery[0][0]


        const {email:emailInDb,id:userId,username:userUsername,name:userFullName} = sqlQuery[0][0]

        const passwordsMatch = await matchPassword(password,passInDb);


        console.log(userFullName)
        const token = jwt.sign({userId:userId,userEmail : emailInDb},process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          })

        console.log(passwordsMatch)

        if(!passwordsMatch){
            throw new CustomError('passwords dont match',401);
        }
        // Sign jwt
        console.log(passwordsMatch);

        res.json({message:"user logged in scuccessfully",data:{userUsername,userId,emailInDb,userFullName,token}})

    } catch (error) {
        console.log(error)
        res.status(error.statusCode).json({message:error.message})
        
    }



    
}


module.exports = {register,login}