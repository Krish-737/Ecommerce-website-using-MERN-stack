import axios from "axios"
import { createreviewfail, createreviewrequest, createreviewsuccess, productfail, productrequest, productsuccess } from "../slices/productslice"


export const getproduct=id =>async (dispatch)=>{

    try {
        dispatch(productrequest())
        const {data}=await axios.get(`/api/v1/product/${id}`)
        dispatch(productsuccess(data))
    } catch (error) {
        dispatch(productfail(error.response.data.message))
    }
}

export const createreview=reviewdata =>async (dispatch)=>{

    try {
        dispatch(createreviewrequest())

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/review`,reviewdata,config)
        dispatch(createreviewsuccess(data))
    } catch (error) {
        dispatch(createreviewfail(error.response.data.message))
    }
}
