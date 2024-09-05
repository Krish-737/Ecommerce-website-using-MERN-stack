import { Fragment, useEffect, useState } from "react"
import Metadata from "../layout/Metadata"
import { clearautherror, login } from "../actions/useraction"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Link, useLocation, useNavigate } from "react-router-dom"


export default function Login(){
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()

    const {loading,error,isauthenticated}=useSelector(state=>state.authstate)
    const redirect=location.search?'/'+location.search.split('=')[1]:'/';
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))

    }
    useEffect(()=>{
        if(isauthenticated){
            navigate(redirect)
        }

        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearautherror)}
            })
        }
        return

    },[error,isauthenticated,navigate,dispatch,redirect])
    return(
        <Fragment>
        <Metadata title={'Login'}/>
        <div className="row wrapper"> 
		        <div className="col-10 col-lg-5">
                    <form onSubmit={submithandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    onChange={e=>{setemail(e.target.value)}}
                                    value={email}
                                    />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                onChange={e=>{setpassword(e.target.value)}}
                                value={password}
                                />
                        </div>

                        <Link to={'/password/forgot'} href="#" className="float-right mb-4">Forgot Password?</Link>
  
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to='/register' className="float-right mt-3">New User?</Link>
                    </form>
		        </div>
        </div>
        </Fragment>
    )
}