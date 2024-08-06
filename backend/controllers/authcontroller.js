const catcherror = require('../middleware/catcherror');
const usermodel = require('../models/usermodel');
const sendtoken = require('../utils/jwt');
const errorhandler=require('../utils/errorhandler');
const sendemail = require('../utils/email');
const crypto=require('crypto')




exports.registeruser=catcherror( async(req,res,next)=>{
    const{name,email,password,avatar}=req.body

    const user=await usermodel.create({
        name,
        email,
        password,
        avatar
    });
    
    sendtoken(user,201,res)

    
    
})
exports.loginuser=catcherror( async(req,res,next)=>{
    const {email,password}=req.body

    if(!email||!password){
        return next(new errorhandler('pls enter email&password',401 ))
    }

    const user= await usermodel.findOne({email}).select('+password')

    if(!user){
        return next(new errorhandler('invalid email&password',401))

    }
    if(!await user.isvalidpass(password)){
        return next(new errorhandler('invalid email&password',401))

    }
    sendtoken(user,201,res)


})

exports.logoutuser=catcherror(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        
    })

    res.status(201).json({
        success:true,
        message:"logged out"
    })
})
exports.forgetpassword=catcherror(async(req,res,next)=>{
    const user= await usermodel.findOne({email:req.body.email})

    if(!user){
        return next(new errorhandler('user not found',401))
    }

    const resettoken=user.getresettoken();
    user.save({validateBeforeSave:false})

    const reseturl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resettoken}`

    const message=`your password reset url \n\n${reseturl}\n\n please ignore it if you not done`

    try {
        sendemail({
            email:user.email,
            subject:"krish password reset",
            message:message
        })
        res.status(200).json({
            success:true,
            message:`email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new errorhandler(error.message,401))
        
    }
})

exports.resetpassword=catcherror(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user=await usermodel.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()}
    })
    if(!user){
        return next(new errorhandler("password token is invalid or expired",401))
    }
    if(req.body.password!==req.body.confirmpassword){
        return next(new errorhandler("password does not match",401))
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordTokenExpire=undefined;
    await user.save({validateBeforeSave:false})
    sendtoken(user,201,res)

})
exports.changepassword=catcherror(async(req,res,next)=>{
    const user=await usermodel.findById(req.user.id).select('+password')

    if(!await user.isvalidpass(req.body.oldpassword)){
        return next(new errorhandler("password does not match",401)) 
    }

    user.password=req.body.newpassword
    await user.save()
    res.status(200).json({
        sucess:true,
        message:"successfully changed"
    })

})
exports.getprofile=catcherror(async(req,res,next)=>{
    const user=await usermodel.findById(req.user.id)

    if(!user){
        return next(new errorhandler("user not found",401)) 
    }
    res.status(200).json({
        success:true,
        user
    })
})
exports.updateprofile=catcherror(async(req,res,next)=>{
    const userdata={
        email:req.body.email,
        name:req.body.name
    }

    const user=await usermodel.findByIdAndUpdate(req.user.id,userdata,{
        new:true,
        runValidators:true

    })
    res.status(200).json({
        success:true,
        user
    })


})
//Admin


exports.getusers=catcherror(async(req,res,next)=>{
    const users=await usermodel.find()

    res.status(200).json({
        success:true,
        users
    })
})

exports.getuser=catcherror(async(req,res,next)=>{
    const user=await usermodel.findById(req.params.id)

    if(!user){
        return next(new errorhandler("user not found",400))
    }
    res.status(200).json({
        success:true,
        user
    })
})
exports.updateuser=catcherror(async(req,res,next)=>{
    const data={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role
    }

    const user=await usermodel.findByIdAndUpdate(req.params.id,data,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })

})
exports.deleteuser=catcherror(async(req,res,next)=>{
    const user=await usermodel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"deleted successfully"
    })
})