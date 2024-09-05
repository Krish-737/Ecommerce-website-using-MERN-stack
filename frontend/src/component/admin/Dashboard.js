import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getadminproducts } from "../actions/productsaction";
import { getuser } from "../actions/useraction";
import { adminorderdetail } from "../actions/orderaction";
import { Link } from "react-router-dom";

export default function Dashboard(){
    const {products=[]}=useSelector(state=>state.productsstate)
    const{adminorders=[]}=useSelector(state=>state.orderstate)
    const {users}=useSelector(state=>state.userstate)
    const dispatch=useDispatch()
    let outofstock=0;

if(products.length>0){
    (products.forEach(product => {
        if(product.stock===0){
            outofstock+=1
        }
    }))
}
let totalamount=0;
if(adminorders.length>0){
    adminorders.forEach(order=>{
        totalamount +=Math.round(order.totalprice) 
    })
}


    useEffect(()=>{
        dispatch(getadminproducts())
        dispatch(getuser)
        dispatch(adminorderdetail)
    },[dispatch])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>

            </div>
                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Dashboard</h1>
                                <div className="row pr-4">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Total Amount<br /> <b>${totalamount}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Orders<br /> <b>{adminorders.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outofstock}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
            </div>
    )
}