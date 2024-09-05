import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link,  } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { deleteuser, getusers } from "../actions/useraction";
import { clearerror, clearuserdeleted } from "../slices/Userslice";

export default function Userlist(){

    const {users=[],loading=true,error,isuserdeleted}=useSelector(state=>state.userstate)
    const dispatch=useDispatch()
    const setusers=()=>{
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
                    label:'Email',
                    field:'email',
                    sort:'asc'
                },
                {
                    label:'Role',
                    field:'role',
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
        users.forEach(user => {
            data.rows.push({
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                actions:(
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className='btn btn-primary'><i className=" fa fa-pencil"></i></Link>
                        <Button onClick={e=>deletehandler(e,user._id)} className="btn btn-danger"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        });
        return data
        
    }
    const deletehandler=(e,id)=>{
        e.target.disabled=true
        dispatch(deleteuser(id))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearerror())}
        })
        return;

        }
        if(isuserdeleted){
            toast.success('User Deleted Successfully',{
                onOpen:()=>{dispatch(clearuserdeleted())}
        })
        return;
        }
        dispatch(getusers)
        
    },[dispatch,error,isuserdeleted])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>

            </div>
                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Userlist</h1>
                               <Fragment>
                                {loading ? <Loader/>:
                                <MDBDataTable
                                    data={setusers()}
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