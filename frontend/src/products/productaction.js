import axios from "axios"
import { productfail, productrequest, productsuccess } from "../component/slices/productslice"


export const getproduct=id =>async (dispatch)=>{

    try {
        dispatch(productrequest())
        const {data}=await axios.get(`/api/v1/product/${id}`)
        dispatch(productsuccess(data))
    } catch (error) {
        dispatch(productfail(error.response.data.message))
    }
}