import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import {  deleteproduct, getadminproducts } from "../actions/productsaction";
import { cleardeletederror, clearproductdeleted } from "../slices/productslice";

export default function Productlist(){

    const {products=[],loading=true,error}=useSelector(state=>state.productsstate)
    const{isdeleted,error:deleteerror}=useSelector(state=>state.productstate)
    const dispatch=useDispatch()
    const setproducts=()=>{
        const data={
            columns:[
                {
                    label:'Id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Price',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'Stock',
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                },

            ],
            rows:[]
        }
        products.forEach(product => {
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`${product.price}`,
                stock:product.stock,
                actions:(
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary'><i className=" fa fa-pencil"></i></Link>
                        <Button onClick={e=>deletehandler(e,product._id)} className="btn btn-danger"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        });
        return data
        
    }
    const deletehandler=(e,id)=>{
        e.target.disabled=true
        dispatch(deleteproduct(id))
    }
    useEffect(()=>{
        if(error || deleteerror){
            toast.error(error||deleteerror,{
                onOpen:()=>{dispatch(cleardeletederror())}
        })
        return;

        }
        if(isdeleted){
            toast.success('Deleted Successfully',{
                onOpen:()=>{dispatch(clearproductdeleted())}
        })
        return;
        }
        dispatch(getadminproducts())
        
    },[dispatch,error,isdeleted,deleteerror])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>

            </div>
                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Dashboard</h1>
                               <Fragment>
                                {loading ? <Loader/>:
                                <MDBDataTable
                                    data={setproducts()}
                                    bordered
                                    hover
                                    striped
                                    className="px-3"
                                />
                                }
                               </Fragment>
                    </div>
        </div>
)
    
}