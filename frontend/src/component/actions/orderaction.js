import axios from "axios"

import { adminorderfail, adminorderrequest, adminordersuccess, createorderfail, createorderrequest, createordersuccess, deleteorderfail, deleteorderrequest, deleteordersuccess, orderdetailfail, orderdetailrequest, orderdetailsuccess, updateorderfail, updateorderrequest, updateordersuccess, userorderfail, userorderrequest, userordersuccess } from "../slices/orderslice"

export const createorder=order=>async(dispatch)=>{
    try {
        dispatch(createorderrequest())
    const {data}=await axios.post(`/api/v1/order/new`,order)
    dispatch(createordersuccess(data))
    } catch (error) {
        dispatch(createorderfail(error.response.data.message))
        
    }
    
}

export const userorders=async(dispatch)=>{
    try {
        dispatch(userorderrequest())
    const {data}=await axios.get(`/api/v1/myorder`)
    dispatch(userordersuccess(data))
    } catch (error) {
        dispatch(userorderfail(error.response.data.message))
        
    }
    
}

export const orderdetail=id=>async(dispatch)=>{
    try {
        dispatch(orderdetailrequest())
    const {data}=await axios.get(`/api/v1/order/${id}`)
    dispatch(orderdetailsuccess(data))
    } catch (error) {
        dispatch(orderdetailfail(error.response.data.message))
        
    }
}

export const adminorderdetail=async(dispatch)=>{
    try {
        dispatch(adminorderrequest())
    const {data}=await axios.get(`/api/v1/admin/allorder`)
    dispatch(adminordersuccess(data))
    } catch (error) {
        dispatch(adminorderfail(error.response.data.message))
        
    }
}
export const deleteorder=id=>async(dispatch)=>{
    try {
        dispatch(deleteorderrequest())
        await axios.delete(`/api/v1/admin/order/${id}`)
    dispatch(deleteordersuccess())
    } catch (error) {
        dispatch(deleteorderfail(error.response.data.message))
        
    }
}
export const updateorder=(id,orderdata)=>async(dispatch)=>{
    try {
        dispatch(updateorderrequest())
    const {data}=await axios.put(`/api/v1/admin/order/${id}`,orderdata)
    dispatch(updateordersuccess(data))
    } catch (error) {
        dispatch(updateorderfail(error.response.data.message))
        
    }
}