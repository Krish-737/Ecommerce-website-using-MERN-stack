import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearautherror, changepassword } from "../actions/useraction"
import { toast } from "react-toastify"

export default function Updatepassword(){

    const [oldpassword,setoldpassword]=useState("")
    const [password,setpassword]=useState("")
    const dispatch=useDispatch()

    const{isupdated,error}=useSelector(state=>state.authstate)
    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('oldpassword',oldpassword)
        formdata.append('password',password)
        dispatch(changepassword(formdata))
    }
    useEffect(()=>{
        if(isupdated){
            toast('updated successfully',{
                type:'success'
            })
            
            return;
        }
        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearautherror)}
            })
            return;
        }
    },[isupdated,error,dispatch])
    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submithandler} className="shadow-lg">
                <h1 className="mt-2 mb-5">Update Password</h1>
                <div className="form-group">
                    <label htmlFor="old_password_field">Old Password</label>
                    <input
                        type="password"
                        id="old_password_field"
                        className="form-control"
                        value={oldpassword}
                        onChange={e=>setoldpassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="new_password_field">New Password</label>
                    <input
                        type="password"
                        id="new_password_field"
                        className="form-control"
                        value={password}
                        onChange={e=>setpassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
            </form>
        </div>
    </div>
    )
} 