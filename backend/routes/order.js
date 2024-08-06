const express=require('express')
const { createorder, getorder, getallorder,myorder, deleteorder, updateorder } = require('../controllers/ordercontroller')
const { authenticate, authorize } = require('../middleware/authenticate')
const router=express.Router()

router.route('/order/new').post(authenticate,createorder)
router.route('/order/:id').get(authenticate,getorder)
router.route('/myorder').get(authenticate,myorder)

//Admin

router.route('/admin/allorder').get(authenticate,authorize('admin'),getallorder)
router.route('/admin/order/:id').delete(authenticate,authorize('admin'),deleteorder)

router.route('/admin/order/:id').put(authenticate,authorize('admin'),updateorder)
module.exports=router