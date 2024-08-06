const jwt=require('jsonwebtoken')
const errorhandler = require("../utils/errorhandler");
const catcherror = require("./catcherror");
const usermodel = require('../models/usermodel');


exports.authenticate=catcherror(async(req,res,next)=>{
    const {token}=req.cookies

    if(!token){
        return next(new errorhandler("login first",401))
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET)
    req.user= await usermodel.findById(decode.id)
    
     
    next()
})
exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new errorhandler(`not allowed for ${req.user.role}`,401))
        }
        next()
    }
}