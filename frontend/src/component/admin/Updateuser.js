import { Fragment, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from "react-redux"
import {  useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { getuser, updateuser } from "../actions/useraction"
import { clearerror, clearuserupdated } from "../slices/Userslice"


export default function Updateuser(){

    const {loading,isuserupdated,error,user={}}=useSelector(state=>state.userstate)
    const {user:authuser={}}=useSelector(state=>state.authstate)

    
    const dispatch=useDispatch()
    const{id:userid}=useParams()

    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [role,setrole]=useState("")
    
    
    
    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('name',name)
        formdata.append('email',email)
        formdata.append('role',role)
       

        dispatch(updateuser(userid,formdata))

    }
   
    useEffect(()=>{
        
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearerror())}
            })
            return;
        }
        
        if(isuserupdated){
            toast.success('Product Updated Successfully',{
                onOpen:()=>{dispatch(clearuserupdated())}
            })
            
            return;
        }
        dispatch(getuser(userid))

        
    },[error,isuserupdated,dispatch,userid])

    useEffect(()=>{
        if(user._id){
            setname(user.name)
            setemail(user.email)
            setrole(user.role)
            
        }
    },[user])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
                <div className="col-12 col-md-10">
            
                     <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={submithandler} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={e=>setname(e.target.value)}
                                />
                                </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Email</label>
                                <input
                                type="text"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e=>setemail(e.target.value)}
                                />
                            </div>

                            

                            <div className="form-group">
                                <label htmlFor="category_field">Role</label>
                                <select disabled={user._id===authuser._id} value={role} onChange={e=>setrole(e.target.value)} className="form-control" id="role_field">
                                   
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    
                                </select>
                            </div>

                                    <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block py-3"
                                    >
                                    UPDATE
                                    </button>
                            </form>
                        </div>
                    </Fragment>
                </div>       
            </div>
        
    )
    
}