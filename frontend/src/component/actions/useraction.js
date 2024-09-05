import axios from "axios"
import { clearerror, forgetpasswordfail, forgetpasswordrequest, forgetpasswordsuccess, loaduserfail,loaduserrequest,loadusersuccess, 
    loginfail, loginrequest, loginsuccess, 
    logoutfail, logoutsuccess, 
    registerfail, registerrequest, registersuccess, 
    resetpasswordfail, 
    resetpasswordrequest, 
    resetpasswordsuccess, 
    updatepasswordfail, 
    updatepasswordrequest, 
    updatepasswordsuccess, 
    updateprofilefail, updateprofilerequest, updateprofilesuccess } from "../slices/authslice"
import { deleteuserfail, deleteuserrequest, deleteusersuccess, updateuserfail, updateuserrequest, updateusersuccess, userfail, userrequest, usersfail, usersrequest, userssuccess, usersuccess } from "../slices/Userslice"


export const login=(email,password) =>async (dispatch)=>{

    try {
        dispatch(loginrequest())
        const {data}=await axios.post(`/api/v1/login`,{email,password})
        dispatch(loginsuccess(data))
    } catch (error) {
        dispatch(loginfail(error.response.data.message))
    }
}
export const clearautherror =(dispatch)=>{
    dispatch(clearerror())
}

export const register=(userdata)=>async(dispatch)=>{
    try {
        dispatch(registerrequest())
        const config={
            headers:
            {
                'Content-type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/v1/register',userdata,config)
        dispatch(registersuccess(data))
    } catch (error) {
        dispatch(registerfail(error.response.data.message))
    }
}

export const loaduser=async(dispatch)=>{
    try {
        dispatch(loaduserrequest())
        
        const {data}=await axios.get('/api/v1/profile')
        dispatch(loadusersuccess(data))
    } catch (error) {
        dispatch(loaduserfail(error.response.data.message))
    }
}

export const logout=async(dispatch)=>{
    try {
        await axios.get('/api/v1/logout')
        dispatch(logoutsuccess())
    } catch (error) {
        dispatch(logoutfail(error.response.data.message))
        
    }
}

export const updateprofile=(userdata)=>async(dispatch)=>{
    try {
        dispatch(updateprofilerequest())
        const config={
            headers:
            {
                'Content-type':'multipart/form-data'
            }
        }
        const {data}=await axios.put(`/api/v1/profile/update`,userdata,config)
        dispatch(updateprofilesuccess(data))
    } catch (error) {
        dispatch(updateprofilefail(error.response.data.message))
    }
}

export const changepassword=(formdata)=>async(dispatch)=>{
    try {
        dispatch(updatepasswordrequest())
        const config={
            headers:
            {
                'Content-type':'application/json'
            }
        }
        await axios.put('/api/v1/password/change',formdata,config)
        dispatch(updatepasswordsuccess())
    } catch (error) {
        dispatch(updatepasswordfail(error.response.data.message))
    }
}

export const forgetpassword=(formdata)=>async(dispatch)=>{
    try {
        dispatch(forgetpasswordrequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/password/forget',formdata,config)
        dispatch(forgetpasswordsuccess(data))
    } catch (error) {
        dispatch(forgetpasswordfail(error.response.data.message))
        
    }
}

export const resetpassword=(formdata,token)=>async(dispatch)=>{
    try {
        dispatch(resetpasswordrequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post(`/api/v1/password/reset/${token}`,formdata,config)
        dispatch(resetpasswordsuccess(data))
    } catch (error) {
        dispatch(resetpasswordfail(error.response.data.message))
        
    }
}

export const getusers=async(dispatch)=>{
    try {
        dispatch(usersrequest())
        
        const {data}=await axios.get('/api/v1/admin/users')
        dispatch(userssuccess(data))
    } catch (error) {
        dispatch(usersfail(error.response.data.message))
    }
}
export const getuser=id=>async(dispatch)=>{
    try {
        dispatch(userrequest())
        
        const {data}=await axios.get(`/api/v1/admin/user/${id}`)
        dispatch(usersuccess(data))
    } catch (error) {
        dispatch(userfail(error.response.data.message))
    }
}
export const deleteuser=id=>async(dispatch)=>{
    try {
        dispatch(deleteuserrequest())
        
        await axios.delete(`/api/v1/admin/user/${id}`)
        dispatch(deleteusersuccess())
    } catch (error) {
        dispatch(deleteuserfail(error.response.data.message))
    }
}
export const updateuser=(id,formdata)=>async(dispatch)=>{
    try {
        dispatch(updateuserrequest())
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`,formdata,config)
        dispatch(updateusersuccess())
    } catch (error) {
        dispatch(updateuserfail(error.response.data.message))
    }
}

