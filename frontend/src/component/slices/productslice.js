import { createSlice } from "@reduxjs/toolkit";

const productslice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        product:{}
    },
    reducers:{
        productrequest(state,action){
            return{
                loading:true,
            
            }
        },
        productsuccess(state,action){
            return{
                loading:false,
                product:action.payload.product
            }
        },
        productfail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
        }

})


const {actions,reducer}=productslice

export const {productrequest,productsuccess,productfail}=actions

export default reducer;