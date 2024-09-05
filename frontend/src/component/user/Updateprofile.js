import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearautherror, updateprofile } from "../actions/useraction"
import { toast } from "react-toastify"

export default function Updateprofile(){

    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [avatar,setavatar]=useState("")
    const [avatarpreview,setavatarpreview]=useState("../images/OIP.jpeg")
    const dispatch=useDispatch()

    const {user,error,isupdated}=useSelector(state=>state.authstate)
    const avatarchange=(e)=>{
        const reader=new FileReader()
            reader.onload=()=>{
                if(reader.readyState===2){
                    setavatarpreview(reader.result)
                    setavatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])

        
    }

    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('name',name)
        formdata.append('email',email)
        formdata.append('avatar',avatar)
        dispatch(updateprofile(formdata))

    }
    useEffect(()=>{
        if(user){
            setname(user.name)
            setemail(user.email)
            if(user.avatar){
                setavatarpreview(user.avatar)
            }
        }

        if(isupdated){
            toast('Updated successfully',{
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
    },[user,isupdated,error,dispatch])

    
    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={submithandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input 
                        type="name" 
                        id="name_field" 
                        className="form-control"
                        name='name'
                        value={name}
                        onChange={e=>setname(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                        
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
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                onChange={avatarchange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                        </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
            </form>
        </div>
    </div>

    )
}