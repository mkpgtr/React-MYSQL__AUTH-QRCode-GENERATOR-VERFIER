const express = require("express")
const { createQrCode, getAllQrCodes, deleteQrCode } = require("../controllers/qrCodes")
const authenticationMiddleware = require('../middleware/auth')
const router = express.Router()


router.get('/',authenticationMiddleware,getAllQrCodes);
router.post('/',authenticationMiddleware,createQrCode);
router.delete('/:id',authenticationMiddleware,deleteQrCode);



module.exports = router