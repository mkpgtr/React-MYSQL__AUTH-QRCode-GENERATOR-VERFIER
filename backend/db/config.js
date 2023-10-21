const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host:3306,
    user : process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()






module.exports = pool