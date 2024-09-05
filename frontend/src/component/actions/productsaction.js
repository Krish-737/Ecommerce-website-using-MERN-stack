import axios from "axios"
import { adminproductsfail, adminproductsrequest, adminproductssuccess, productsfail, productsrequest, productssuccess } from "../slices/productsslice"
import { deletereviewfail, deletereviewrequest, deletereviewsuccess, newproductfail, newproductrequest, newproductsuccess, productdeletefail, productdeleterequest, productdeletesuccess, reviewsfail, reviewsrequest, reviewssuccess, updateproductfail, updateproductrequest, updateproductsuccess } from "../slices/productslice";


export const getproducts= (keyword,price,category,ratings,currentpage) =>async (dispatch)=>{

    try {
        dispatch(productsrequest())
        let link=`/api/v1/products?page=${currentpage}`;

        
        if(keyword){
            link +=`&keyword=${keyword}`
        }
        if(price){
            link +=`&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link +=`&category=${category}`
        }
        if(ratings){
            link +=`&ratings=${ratings}`
        }
        const {data}=await axios.get(link)
        dispatch(productssuccess(data))
    } catch (error) {
        dispatch(productsfail(error.response.data.message))
    }
}

export const getadminproducts=() =>async (dispatch)=>{

    try {
        dispatch(adminproductsrequest())
        const {data}=await axios.get(`/api/v1/admin/products`)
        dispatch(adminproductssuccess(data))
    } catch (error) {
        dispatch(adminproductsfail(error.response.data.message))
    }
}
export const createnewproduct=productdata =>async (dispatch)=>{

    try {
        dispatch(newproductrequest())
        const {data}=await axios.post(`/api/v1/admin/product/new`,productdata)
        dispatch(newproductsuccess(data))
    } catch (error) {
        dispatch(newproductfail(error.response.data.message))
    }
}
export const deleteproduct=id =>async (dispatch)=>{

    try {
        dispatch(productdeleterequest())
        await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch(productdeletesuccess())
    } catch (error) {
        dispatch(productdeletefail(error.response.data.message))
    }
}
export const updateproduct=(id,productdata) =>async (dispatch)=>{

    try {
        dispatch(updateproductrequest())
        const {data}=await axios.put(`/api/v1/admin/product/${id}`,productdata)
        dispatch(updateproductsuccess(data))
    } catch (error) {
        dispatch(updateproductfail(error.response.data.message))
    }
}

export const getreviews=id=> async (dispatch)=>{

    try {
        dispatch(reviewsrequest())
        
        const {data}=await axios.get(`/api/v1/admin/getreviews`,{params:{id}})
        dispatch(reviewssuccess(data))
    } catch (error) {
        dispatch(reviewsfail(error.response.data.message))
    }
}

export const deletereviews=(productid,id) =>async (dispatch)=>{

    try {
        dispatch(deletereviewrequest())
        
        await axios.delete(`/api/v1/admin/deletereview`,{params:{productid,id}})
        dispatch(deletereviewsuccess())
    } catch (error) {
        dispatch(deletereviewfail(error.response.data.message))
    }
}
