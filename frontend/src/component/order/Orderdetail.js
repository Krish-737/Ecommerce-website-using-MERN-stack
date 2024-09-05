import { useDispatch, useSelector } from "react-redux"
import { orderdetail as orderdetailaction } from "../actions/orderaction";
import { Link, useParams } from "react-router-dom"
import { Fragment, useEffect } from "react"
import Loader from "../layout/Loader"

export default function Orderdetail(){

    const {orderdetail,loading}=useSelector(state=>state.orderstate)
    const {shippinginfo={},user={},orderstatus='Processing',orderitems=[],totalprice=0,paymentinfo={}}=orderdetail
    const ispaid=paymentinfo && paymentinfo.status==="succeeded" ? true:false
    const dispatch=useDispatch()
    const {id}=useParams()

    useEffect(()=>{
        dispatch(orderdetailaction(id))
    },[dispatch,id])

    return(
        <Fragment>
            {loading ?<Loader/>:
            <Fragment>
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {orderdetail._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b>{shippinginfo.phoneno} </p>
                        <p className="mb-4"><b>Address:</b>{shippinginfo.address},{shippinginfo.state},{shippinginfo.country}</p>
                        <p><b>Amount:</b> ${totalprice}</p>

                        <hr />

                        <h4 className="my-4">Payment:</h4>
                    
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
                    </div>
            
        </Fragment>
}
        </Fragment>

    )
}