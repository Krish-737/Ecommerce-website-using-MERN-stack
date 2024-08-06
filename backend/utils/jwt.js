const sendtoken=(user,statusCode,res)=>{
    //tokrn generating
    const token=user.getjwttoken();

    //cookies
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPRIES*24*60*60*1000),
        httpOnly:true, 
    }

    res.status(statusCode).cookie('token',token,options)
    .json({
        sucess:true,
        token,user
    }
    )


}
module.exports=sendtoken