const mongoose  = require('mongoose')
const Product=require('../models/productModel')
const errorhandler=require('../utils/errorhandler')
const catcherror=require('../middleware/catcherror')
const apifeatures=require('../utils/apifeatures')


// getting product
exports.getproducts=async(req,res,next)=>{
    //return next(new errorhandler('product not found'))
    const resperpage=3;
    let sproduct= new apifeatures(Product.find(),req.query).search().filter().paginate(resperpage);

    let bulidQuery=()=>{
        return new apifeatures(Product.find(),req.query).search().filter()
    }
    let filteredcount=await bulidQuery().query.countDocuments()

    let totalproductcount=await Product.countDocuments({})

    let productcount=totalproductcount
    if(filteredcount!==totalproductcount){
        productcount=filteredcount
    }
    
    const products= await bulidQuery().paginate(resperpage).query;

    res.status(200).json({
        success:true,
        count:productcount,
    
        resperpage,
        products
    })
}
// creating product
exports.newproduct=catcherror( async(req,res,next)=>{
    let images=[]
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENV==='production'){
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${BASE_URL}/uploads/product/${file.originalname}`
            images.push({image:url})
        })
    }
    req.body.images=images
    req.body.user=req.user.id
   const product= await Product.create(req.body)
   res.status(201).json({
    success:true,
    product 
   })
})

// single product

exports.getsingleproduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id).populate('reviews.user','name email')
    if(!product){
        return next(new errorhandler('product not found',400))
    }
    res.status(201).json({
        success:true,
        product
    })

}

// update product 

exports.updateproduct=catcherror(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

   
    let images=[]
    if(req.body.imagescleared==='false'){
        images=product.images
    }
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENV==='production'){
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${BASE_URL}/uploads/product/${file.originalname}`
            images.push({image:url})
        })
    
    }
    req.body.images=images
    if(!product) {
        return next(new errorhandler('product not found',400))
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true

    })
    
    res.status(201).json({
        success:true,
        message:"upadated successfully",
        product
    })

})
// delete product
exports.deleteproduct=catcherror(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product) {
        return next(new errorhandler('product not found',400))
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success:true,
        message:"deleted successfully"
    })

})

exports.createreview=catcherror(async(req,res,next)=>{
    const {productid,rating,comment}=req.body

    const review={
        user:req.user.id,
        rating,
        comment
    }

    const product=await Product.findById(productid)
    const isreviewed=product.reviews.find(review=>{
        return review.user==req.user.id
    })
    if(isreviewed){
        product.reviews.forEach(review=>{
            if(review.user==req.user.id){
                review.rating=rating,
                review.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }
    product.ratings=product.reviews.reduce((acc,review)=>{
        return review.rating+acc
    },0)/product.reviews.length
    product.ratings=isNaN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        review
    })
})

exports.getreviews=catcherror(async(req,res,next)=>{
    const product=await Product.findById(req.query.id).populate('reviews.user','name email')

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

exports.deletereview=catcherror(async(req,res,next)=>{
    const product=await Product.findById(req.query.productid)

    const reviews=product.reviews.filter(review=>{
        return review._id.toString()!==req.query.id.toString()
    })
    let numOfReviews=product.numOfReviews=reviews.length
    let ratings=reviews.reduce((acc,review)=>{
        return review.rating+acc
    },0)/reviews.length
    product.ratings=isNaN(product.ratings)?0:product.ratings

    await Product.findByIdAndUpdate(req.query.productid,{
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success:true,
        reviews,
        numOfReviews,
        ratings
    })
})

exports.getadminproduct=catcherror(async(req,res,next)=>{

    const products=await Product.find()
    res.status(200).json({
        sucess:true,
        products

})
})