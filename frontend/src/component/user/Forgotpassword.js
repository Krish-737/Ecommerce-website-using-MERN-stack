import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearautherror, forgetpassword } from "../actions/useraction"

import { toast } from "react-toastify"

export default function Forgotpassword(){

    const[email,setemail]=useState('')
    const {error,message}=useSelector(state=>state.authstate)
    const dispatch=useDispatch()
    
    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('email',email)
        dispatch(forgetpassword(formdata))
        
    }
    useEffect(()=>{
        if(message){
            toast(message,{
                type:'success'
            })
            setemail("")
            return
        }
        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearautherror)}
            })
        }
    },[message,error,dispatch])
    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submithandler} className="shadow-lg">
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={e=>setemail(e.target.value)}
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Send Email
            </button>

            </form>
        </div>
    </div>

    )
}