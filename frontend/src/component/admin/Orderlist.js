import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { adminorderdetail, deleteorder } from "../actions/orderaction";
import { cleardelete, cleardeleteerror } from "../slices/orderslice";

export default function Orderlist(){

    const {adminorders=[],loading=true,error,isdeleted}=useSelector(state=>state.orderstate)
    
    const dispatch=useDispatch()
    const setorders=()=>{
        const data={
            columns:[
                {
                    label:'Id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Number Of Items',
                    field:'noi',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amt',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'sts',
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
        adminorders.forEach(order => {
            data.rows.push({
                id:order._id,
                noi:order.orderitems.length,
                amt:`$${order.totalprice}`,
                sts:<p style={{color:order.orderstatus.includes('Delivered')?'green':'red'}}>{order.orderstatus}</p>,
                actions:(
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary'><i className=" fa fa-pencil"></i></Link>
                        <Button onClick={e=>deletehandler(e,order._id)} className="btn btn-danger"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        });
        return data
        
    }
    const deletehandler=(e,id)=>{
        e.target.disabled=true
        dispatch(deleteorder(id))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(cleardeleteerror())}
        })
        return;

        }
        if(isdeleted){
            toast.success('Deleted Successfully',{
                onOpen:()=>{dispatch(cleardelete())}
        })
        return;
        }
        dispatch(adminorderdetail)
        
    },[dispatch,error,isdeleted])
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
                                    data={setorders()}
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