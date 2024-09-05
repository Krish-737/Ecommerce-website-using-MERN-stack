import { Fragment, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { orderdetail as odetail, updateorder } from "../actions/orderaction"
import { clearordererror, clearupdate } from "../slices/orderslice"


export default function Updateorder(){

    const {loading,isupdated,error,orderdetail={}}=useSelector(state=>state.orderstate)
    const{user={},orderitems=[],shippinginfo={},totalprice=0,paymentinfo={}}=orderdetail
    const ispaid=paymentinfo.status==='succeeded'?true:false;
    const [orderstatus,setorderstatus]=useState()
    
    const dispatch=useDispatch()
    const{id:orderid}=useParams()

   
  
    const submithandler=(e)=>{
        e.preventDefault()
       const orderdata={}
       orderdata.orderstatus=orderstatus


        dispatch(updateorder(orderid,orderdata))

    }
    
    useEffect(()=>{
        
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearordererror())}
            })
            return;
        }
        
        if(isupdated){
            toast.success('Order Updated Successfully',{
                onOpen:()=>{dispatch(clearupdate())}
            })
        
            
            return;
        }
        dispatch(odetail(orderid))

        
    },[error,isupdated,dispatch,orderid])

    useEffect(()=>{
        if(orderdetail._id){
            setorderstatus(orderdetail.orderstatus)
            
        }
    },[orderdetail])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
                <div className="col-12 col-md-10">
            
                     <Fragment>
                     <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {orderdetail._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b>{shippinginfo.phoneno} </p>
                        <p className="mb-4"><b>Address:</b>{shippinginfo.address},{shippinginfo.state},{shippinginfo.country}</p>
                        <p><b>Amount:</b> ${totalprice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p className={ispaid ?'greenColor':'redColor'} ><b>{ispaid?'PAID':'NOT PAID'}</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={orderstatus && orderstatus.includes('Delivered')?'greenColor':'redColor'} ><b>{orderstatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {orderitems && orderitems.map(item=>
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${totalprice}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity}Piece(s)</p>
                                        </div>
                                    </div>
                                    )}
                        </div>
                        <hr />
                        </div>
                        <div className="col-12 col-lg-3 mt-5">
                                <h4 className="my-4">Order Status</h4>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        onChange={e=>setorderstatus(e.target.value)}
                                        value={orderstatus}
                                        name="Status"
                                    >
                                        <option value='Processing'>Processing</option>
                                        <option value='Shipped'>Shipped</option>
                                        <option value='Delivered'>Delivered</option>

                                    </select>
                                    
                                </div>
                                <button
                                        disabled={loading}
                                        onClick={submithandler}
                                        className="btn btn-primary btn-block"
                                    >
                                        Update Status
                                    </button>
                        </div>
                    </div>
                    </Fragment>
                </div>       
            </div>
        
    )
    
}