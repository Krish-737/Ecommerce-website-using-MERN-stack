import { createSlice } from "@reduxjs/toolkit";


const productsslice=createSlice({
    name:'products',
    initialState:{
        loading:false
    },
    reducers:{
        productsrequest(state,action){
            return{
                loading:true,

            }
        },
        productssuccess(state,action){
            return{
                loading:false,
                products:action.payload.products,
                productscount:action.payload.count,
                resperpage:action.payload.resperpage
            }
        },
        productsfail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        adminproductsrequest(state,action){
            return{
                loading:true,

            }
        },
        adminproductssuccess(state,action){
            return{
                loading:false,
                products:action.payload.products,
                
            }
        },
        adminproductsfail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        clearadminerror(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
    
})

const {actions,reducer}=productsslice

export const {productsrequest,productssuccess,productsfail,
adminproductsrequest,adminproductssuccess,adminproductsfail,clearadminerror
}=actions

export default reducer;