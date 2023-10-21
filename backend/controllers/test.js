const pool  = require("../db/config")

const getStudents = async(req,res)=>{


  try {

    const {username,password} = req.body
    const results = await pool.query(`select * from students`);

    console.log(results);
 
 
 
     res.send('from get students');
  } catch (error) {
    console.log(error)
  }
}

module.exports = {getStudents}