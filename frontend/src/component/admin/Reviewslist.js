import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"

import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";

import { deletereviews, getreviews } from "../actions/productsaction";
import { clearreviewdeleted, clearreviewerror } from "../slices/productslice";

export default function Reviewlist(){

    const {reviews=[],loading=true,error,isreviewdeleted}=useSelector(state=>state.productstate)
    const[productid,setproductid]=useState()
    
    const dispatch=useDispatch()
    const setreviews=()=>{
        const data={
            columns:[
                {
                    label:'Id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Rating',
                    field:'rating',
                    sort:'asc'
                },
                {
                    label:'User',
                    field:'user',
                    sort:'asc'
                },
                {
                    label:'Comment',
                    field:'cmt',
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
        reviews.forEach(review => {
            data.rows.push({
                id:review._id,
                user:review.user.name,
                cmt:review.comment,
                rating:review.rating,
                actions:(
                    <Fragment>
                        <Button onClick={e=>deletehandler(e,review._id)} className="btn btn-danger"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        });
        return data
        
    }
    const deletehandler=(e,id)=>{
        e.target.disabled=true
        dispatch(deletereviews(productid,id))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearreviewerror())}
        })
        return;

        }
        if(isreviewdeleted){
            toast.success('Review Deleted Successfully',{
                onOpen:()=>{dispatch(clearreviewdeleted())}
        })
        return;
        }
        dispatch(getreviews(productid))
        
    },[dispatch,error,isreviewdeleted,productid])

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(getreviews(productid))
    }
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>

            </div>
                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Reviews list</h1>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submithandler}>
                                    <div className="form-group">
                                        <label>Product Id</label>
                                        <input
                                            type="text"
                                            onChange={e=>setproductid(e.target.value)}
                                            value={productid}
                                            className="form-control"
                                        />

                                    </div>
                                    <button className="btn btn-primary btn-block py-2" type='submit'disabled={loading}>Search</button>

                                </form>

                            </div>
                        </div>
                               <Fragment>
                                {loading ? <Loader/>:
                                <MDBDataTable
                                    data={setreviews()}
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