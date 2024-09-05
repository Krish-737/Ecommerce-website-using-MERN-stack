const catcherror=require('../middleware/catcherror');

const Stripe=require('stripe')
const stripe=Stripe('sk_test_51NvjwiSA1kX0LxGyBsA87bxteRYHiT4u0ubO05wfOl2TiVm6avPhzFyk2Jsp9I00mmh2YwPizQvgyH53d1PIEXVy00afdQzdQ9')


exports.processpayment=catcherror(async(req,res,next)=>{
    const {amount}=req.body;
    if(!amount){
        return res.status(400).send({error:'amount required'})
    }
    try {
        
        const paymentIntent= await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"usd",
            description:"test payment",
            metadata:{integration_check:'accpect_payment'},
            shipping:req.body.shipping,
            payment_method_types:['card'],
           
            
        })
        res.status(200).json({
            sucess:true,
            client_secret:paymentIntent.client_secret
        })
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    

})

exports.sendstripeapi=catcherror(async(req,res,next)=>{
    res.status(200).json({
        stripeApikey:process.env.STRIPE_API_KEY
    })
})