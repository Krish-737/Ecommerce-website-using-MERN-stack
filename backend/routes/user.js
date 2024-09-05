const express=require('express');
const Multer=require('multer')
const path=require('path')

 const upload=Multer({storage:Multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/users'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})
const { registeruser, 
    loginuser, 
    logoutuser, 
    forgetpassword,
    resetpassword, 
    changepassword, 
    getprofile, 
    updateprofile, 
    getusers, 
    getuser,
    updateuser,
    deleteuser
    } = require('../controllers/authcontroller');
const { authenticate, authorize } = require('../middleware/authenticate');


const router=express.Router()

router.route('/register').post(upload.single('avatar'),registeruser);
router.route('/login').post(loginuser);
router.route('/logout').get(logoutuser);
router.route('/password/forget').post(forgetpassword);
router.route('/password/reset/:token').post(resetpassword);
router.route('/password/change').put(authenticate,changepassword);
router.route('/profile').get(authenticate,getprofile);
router.route('/profile/update').put(authenticate,upload.single('avatar'),updateprofile);


//Admin
router.route('/admin/users').get(authenticate,authorize('admin'),getusers)
router.route('/admin/user/:id').get(authenticate,authorize('admin'),getuser)
                                .put(authenticate,authorize('admin'),updateuser)
                                .delete(authenticate,authorize('admin'),deleteuser)
module.exports=router;

