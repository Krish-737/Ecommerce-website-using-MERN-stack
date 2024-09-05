import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateshipping } from "./shipping";
import Checkoutstep from "./checkoutstep";

export default function Confirmorder(){
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.authstate)
    const {shippinginfo,items}=useSelector(state=>state.cartstate)
    const subtotal=items.reduce((acc,item)=>(acc+item.quantity*item.price),0)
    const shippingprice=Number(subtotal>200?0:20)
    const taxprice=Number( 0.05*subtotal).toFixed(2)
    const tax=Number( 0.05*subtotal)
    const totalprice=Number(subtotal + tax+shippingprice ).toFixed(2)

    const processpayment=()=>{
        const data={
            subtotal,shippingprice,taxprice,totalprice
        }
        sessionStorage.setItem('orderinfo',JSON.stringify(data))
        navigate('/payment')
    }

    useEffect(()=>{
        validateshipping(shippinginfo,navigate)
    },[shippinginfo,navigate])

    return(
        <Fragment>
            <Checkoutstep shipping confirmorder/>
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b> {shippinginfo.phoneno}</p>
                        <p className="mb-4"><b>Address:</b> {shippinginfo.address},{shippinginfo.city}-{shippinginfo.postalcode},
                        {shippinginfo.state},{shippinginfo.country} </p>
                        
                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>

                        <hr />
                        <Fragment>
                        {items.map(item=>
                        <div className="cart-item my-1">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65"/>
                                </div>

                                <div className="col-5 col-lg-6">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x ${item.price} = <b>${item.quantity*item.price}</b></p>
                                </div>

                            </div>
                        </div>
                        )}
                        <hr />
                        </Fragment>

                    </div>
                    
                    <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{subtotal}</span></p>
                                <p>Shipping: <span className="order-summary-values">${shippingprice}</span></p>
                                <p>Tax:  <span className="order-summary-values">${taxprice} </span></p>

                                <hr />

                                <p>Total: <span className="order-summary-values">${totalprice}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block"onClick={processpayment} >Proceed to Payment</button>
                            </div>
                        </div>
                    
                    
                    </div>
        </Fragment>
    )
}