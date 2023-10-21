const express = require('express')
const { getStudents } = require('../controllers/test')


const router = express.Router();

router.get('/',getStudents);

module.exports = router