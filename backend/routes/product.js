const express =require('express');
const { getproducts, newproduct, getsingleproduct, deleteproduct, updateproduct, createreview, getreviews, deletereview } = require('../controllers/productcontroller');
const { authenticate, authorize } = require('../middleware/authenticate');
const router=express.Router();

router.route('/products').get(getproducts);
router.route('/product/new').post(authenticate ,authorize('admin'),newproduct)
router.route('/product/:id').get(getsingleproduct)
                            .delete(deleteproduct)
                            .put(updateproduct)
router.route('/review').put(authenticate,createreview)
router.route('/getreviews').get(authenticate,getreviews)
router.route('/deletereview').delete(authenticate,deletereview)
module.exports=router