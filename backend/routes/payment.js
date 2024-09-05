const express=require('express')
const { processpayment, sendstripeapi } = require('../controllers/Paymentcontroller')
const { authenticate } = require('../middleware/authenticate')
const router=express.Router()



router.route('/payment/process').post(authenticate,processpayment)
router.route('/stripeapi').get(authenticate,sendstripeapi)

module.exports=router