import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Fragment, useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { validateshipping } from "./shipping"
import axios from "axios"
import { toast } from "react-toastify"
import { ordercomplete } from "../slices/cartslice"
import { createorder } from "../actions/orderaction"
import { clearoerror } from "../slices/orderslice"

export default function Payment(){

    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const orderinfo=JSON.parse( sessionStorage.getItem('orderinfo'))
    const {user}=useSelector(state=>state.authstate)
    const {items:cartitems,shippinginfo}=useSelector(state=>state.cartstate)
    const {error:oerror}=useSelector(state=>state.orderstate)
    const paymentdata={
        amount:Math.round(orderinfo.totalprice * 100),
        shipping:{
        name:user.name,
        address:{
            city:shippinginfo.city,
            postal_code:shippinginfo.postalcode,
            country:shippinginfo.country,
            state:shippinginfo.state,
            
        },
        phone:shippinginfo.phoneno
    }
    }

    const order={
        orderitems:cartitems,
        shippinginfo
    }
    if(orderinfo){
        order.subtotal=orderinfo.subtotal
        order.totalprice=orderinfo.totalprice
        order.taxprice=orderinfo.taxprice
        order.shippingprice=orderinfo.shippingprice

    }

    useEffect(()=>{
        validateshipping(shippinginfo,navigate)
        if(oerror){
          toast.error(oerror,{
            onOpen:()=>{dispatch(clearoerror())}
          })
        }
    },[navigate,shippinginfo,dispatch,oerror])

    const submithandler=async(e)=>{
        e.preventDefault()
        document.querySelector('#pay_btn').disabled=true
        

        try {
            
            const {data}=await axios.post(`/api/v1/payment/process`,paymentdata)
            const clientsecret=data.client_secret
            
            
            const result= await stripe.confirmCardPayment(clientsecret,{
                payment_method:{
                    type:'card',
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                            name:user.name,
                            address:{
                                line1:shippinginfo.address,
                                city:shippinginfo.city,
                                state:shippinginfo.state,
                                country:'in'
                            },
                            
                            
                    },
                }
            })

             if( result.error){
                toast.error((await result).error.message)
                document.querySelector('#pay_btn').disabled=false

             }
             else{
                if((await result).paymentIntent.status==='succeeded'){
                  toast.success('Payment Success')
                  order.paymentinfo={
                    id:result.paymentIntent.id,
                    status:result.paymentIntent.status
                                    }
                 
                  dispatch(ordercomplete())
                  dispatch(createorder(order))
                  navigate('/order/success')

                 
                }
                else{
                  toast.warning('Please try again!')
                }

             }

        } catch (error) {
            
        }
    }
    
 


    return(
        <Fragment>
             <div className="row wrapper">
		            <div className="col-10 col-lg-5">
                    <form onSubmit={submithandler} className="shadow-lg">
                        
                        <h1 className="mb-4">Card Info</h1>
                        
                            <div className="form-group">
                            
                                <label htmlFor="card_num_field">Card Number</label>
                                      <CardNumberElement
                                        type="text"
                                        id="card_num_field"
                                        className="form-control"
                                        
                                      />
                                    </div>

                                    
				
                                  <div className="form-group">
                                            <label htmlFor="card_exp_field">Card Expiry</label>
                                            <CardExpiryElement
                                              type="text"
                                              id="card_exp_field"
                                              className="form-control"
                                              
                                            />
                                          </div>
                                  
                                  <div className="form-group">
                                            <label htmlFor="card_cvc_field">Card CVC</label>
                                            <CardCvcElement
                                              type="text"
                                              id="card_cvc_field"
                                              className="form-control"
                                              value=""
                                              
                                            />
                                          </div>
                                
                                      
                                          <button
                                            id="pay_btn"
                                            type="submit"
                                            className="btn btn-block py-3"
                                          >
                                            Pay-{`$${orderinfo&&orderinfo.totalprice}`}
                                          </button>
                              
                                        </form>
                                  </div>
                                  </div>
                                  </Fragment>
       
    )
}