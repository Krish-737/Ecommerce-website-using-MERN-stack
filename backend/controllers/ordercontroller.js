const catcherror=require('../middleware/catcherror');
const ordermodel = require('../models/ordermodel');
const errorhandler = require('../utils/errorhandler');
const productModel = require('../models/productModel');

exports.createorder=catcherror(async(req,res,next)=>{
    const {
        orderitems,
        shippinginfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice,
        paymentinfo
    } = req.body;
    const order=await ordermodel.create({
        orderitems,
        shippinginfo,
        itemsprice,
        shippingprice,
        taxprice,
        totalprice,
        paymentinfo,
        paidAt:Date.now(),
        user:req.user.id

    })
    res.status(200).json({
        success:true,
        order
    })
})

exports.getorder=catcherror(async(req,res,next)=>{
    const order=await ordermodel.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new errorhandler(`order is not found in this id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        order
    })
})


exports.myorder=catcherror(async(req,res,next)=>{
    const order=await ordermodel.find({user:req.user.id})
    if(!order){
        return next(new errorhandler(`no order found`,404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//Admin

exports.getallorder=catcherror(async(req,res,next)=>{
    const orders=await ordermodel.find().populate('user','name email')

    let totalamount=0;

    orders.forEach(order=> {
        totalamount +=order.totalprice
    })


    res.status(200).json({
        success:true,
        totalamount,
        orders
    })
})

exports.updateorder=catcherror(async(req,res,next)=>{
    const order=await ordermodel.findById(req.params.id)

    if(order.orderstatus=='delivered'){
        return next(new errorhandler("order is already delivered",400))
    }

    order.orderitems.forEach(async items=>{
        updateStock(items.product,items.quantity)
    })
    order.orderstatus=req.body.orderstatus
    order.deliveredAt=Date.now()
    await order.save()


    res.status(200).json({
        success:true,
        order
    })
    
})
async function updateStock(productid,quantity){
    let product=await productModel.findById(productid)
    product.stock=product.stock-quantity,
    product.save({validateBeforeSave:false})
}

exports.deleteorder=catcherror(async(req,res,next)=>{
    const orders=await ordermodel.findByIdAndDelete(req.params.id)

    

    res.status(200).json({
        success:true,
        message:"deleted successfully"
    })
})


