import axios from "axios"
import { productsfail, productsrequest, productssuccess } from "../component/slices/productsslice"


export const getproducts= (keyword,currentpage) =>async (dispatch)=>{

    try {
        dispatch(productsrequest())
        let link=`/api/v1/products?page=${currentpage}`;

        
        if(keyword){
            link +=`&keyword=${keyword}`
        }
        const {data}=await axios.get(link)
        dispatch(productssuccess(data))
    } catch (error) {
        dispatch(productsfail(error.response.data.message))
    }
}