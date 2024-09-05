import axios from "axios"
import { addcartitemrequest, addcartitemsuccess } from "../slices/cartslice"

export const addcartitem=(id,quantity)=>async(dispatch)=>{
    try {
        dispatch(addcartitemrequest())
    const {data}=await axios.get(`/api/v1/product/${id}`)
    dispatch(addcartitemsuccess({
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].image,
        stock:data.product.stock,
        quantity
    }))
    } catch (error) {
        
    }
    
}