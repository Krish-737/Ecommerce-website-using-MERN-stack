import { createSlice } from "@reduxjs/toolkit";



const orderslice=createSlice({
    name:'order',
    initialState:{
        orderdetail:{},
        userorders:[],
        loading:false,
        adminorders:[],
        isdeleted:false,
        isupdated:false
    },
    reducers:{
        createorderrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        createordersuccess(state,action){
            return{
                ...state,
                orderdetail:action.payload.order,
                loading:false
            }
        },
        createorderfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        },
        clearoerror(state,error){
            return{
                ...state,
                error:null
            }
        },
        userorderrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        userordersuccess(state,action){
            return{
                ...state,
                userorders:action.payload.order,
                loading:false
            }
        },
        userorderfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        },
        orderdetailrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        orderdetailsuccess(state,action){
            return{
                ...state,
                orderdetail:action.payload.order,
                loading:false
            }
        },
        orderdetailfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        },
        adminorderrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        adminordersuccess(state,action){
            return{
                ...state,
                adminorders:action.payload.orders,
                loading:false
            }
        },
        adminorderfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        },
        deleteorderrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        deleteordersuccess(state,action){
            return{
                ...state,
                isdeleted:true,
                loading:false
            }
        },
        deleteorderfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false,
                isdeleted:false
            }
        },
        updateorderrequest(state,action){
            return{
                ...state,
                loading:true,

            
            }
        },
        updateordersuccess(state,action){
            return{
                ...state,
                adminorders:action.payload.order,
                loading:false,
                isupdated:true
            }
        },
        updateorderfail(state,action){
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        },
        clearupdate(state,action){
            return{
                ...state,
                loading:true,
                isupdated:false
            }
        },
        cleardelete(state,action){
            return{
                ...state,
                isdeleted:false,
                loading:false
            }
        },
        cleardeleteerror(state,action){
            return{
                ...state,
                error:null,
                isdeleted:false,
                loading:false
            }
        },
        clearordererror(state,action){
            return{
                ...state,
                error:null
            }
        }
        

    }
})
const {actions,reducer}=orderslice

export const {
    createorderrequest,createordersuccess,createorderfail,clearoerror,
    userorderrequest,userordersuccess,userorderfail,
    orderdetailrequest,orderdetailsuccess,orderdetailfail,
    adminorderrequest,adminordersuccess,adminorderfail,
    deleteorderrequest,deleteordersuccess,deleteorderfail,cleardelete,cleardeleteerror,
    updateorderrequest,updateordersuccess,updateorderfail,clearupdate,
    clearordererror

}=actions

export default reducer