const express =require('express');
const { getproducts, newproduct, getsingleproduct, deleteproduct, updateproduct, createreview, getreviews, deletereview, getadminproduct } = require('../controllers/productcontroller');
const { authenticate, authorize } = require('../middleware/authenticate');
const multer = require('multer');
const router=express.Router();
const path=require('path')


const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/product'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

router.route('/products').get(getproducts);

router.route('/product/:id').get(getsingleproduct)
                            
                    
router.route('/review').put(authenticate,createreview)

router.route('/admin/getreviews').get(authenticate,authorize('admin'),getreviews)
router.route('/admin/deletereview').delete(authenticate,authorize('admin'),deletereview)
router.route('/admin/product/new').post(authenticate ,authorize('admin'),upload.array('images'),newproduct)
router.route('/admin/products').get(authenticate ,authorize('admin'),getadminproduct)
router.route('/admin/product/:id').delete(authenticate ,authorize('admin'),deleteproduct)
router.route('/admin/product/:id').put(authenticate ,authorize('admin'),upload.array('images'),updateproduct)

module.exports=router