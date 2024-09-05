import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearautherror, register } from "../actions/useraction"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function Register(){

    const[userdata,setuserdata]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const[avatar,setavatar]=useState("")
    const[avatarpreview,setavatarpreview]=useState("/images/OIP.jpeg")
    const dispatch=useDispatch()
    const {loading,error,isauthenticated}=useSelector(state=>state.authstate)

    const onChange=(e)=>{

        if(e.target.name==='avatar'){
            const reader=new FileReader()
            reader.onload=()=>{
                if(reader.readyState===2){
                    setavatarpreview(reader.result)
                    setavatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])

        }else{
            setuserdata({...userdata,[e.target.name]:e.target.value})
        }   
    }
    const submithandler=(e)=>{
        e.preventDefault();
        const formdata= new FormData();
        formdata.append('name',userdata.name)
        formdata.append('email',userdata.email)
        formdata.append('password',userdata.password)
        formdata.append('avatar',avatar)

        dispatch(register(formdata))
    }
    useEffect(()=>{
        if(isauthenticated){
            navigate('/')
        }
        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearautherror)}
            })
        }
    })
    return(
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form onSubmit={submithandler} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input name="name" onChange={onChange} type="name" id="name_field" className="form-control"   />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                name="email"
                onChange={onChange}
                type="email"
                id="email_field"
                className="form-control"
            
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                name="password"
                onChange={onChange}
                type="password"
                id="password_field"
                className="form-control"
                
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarpreview}
                              className='rounded-circle'
                              alt='preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          onChange={onChange}
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div> 
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
    )
}