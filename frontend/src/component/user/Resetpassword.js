import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearautherror, resetpassword } from "../actions/useraction"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function Resetpassword(){

    const [password,setpassword]=useState('')
    const {token}=useParams()
    const[confirmpassword,setconfirmpassword]=useState('')
    const navigate=useNavigate()
    const {isauthenticated,error}=useSelector(state=>state.authstate)
    const dispatch=useDispatch()
    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('password',password)
        formdata.append('confirmpassword',confirmpassword)
        dispatch(resetpassword(formdata,token))

    }
    useEffect(()=>{
        if(isauthenticated){
            toast('Password reseted successfully',{
                type:'sucess'
            })
            navigate('/')
        }
        if(error){
            toast(error,{
                type:error,
                onOpen:()=>{dispatch(clearautherror)}
            })
            return
        }

    },[isauthenticated,error,dispatch,navigate])
    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submithandler} className="shadow-lg">
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={e=>setpassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirmpassword}
                        onChange={e=>setconfirmpassword(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Set Password
                </button>

            </form>
        </div>
    </div>
    )
}