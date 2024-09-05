import { createSlice } from "@reduxjs/toolkit";

const Userslice=createSlice({
    name:'User',
    initialState:{
        loading:false,
        user:{},
        users:[],
        isuserupdated:false,
        isuserdeleted:false
    },
    reducers:{
        usersrequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        userssuccess(state,action){
            return{
                ...state,
                loading:false,
                users:action.payload.users
            }
        },
        usersfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearerror(state,action){
            return{
                ...state,
                error:null
            }
        },
        userrequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        usersuccess(state,action){
            return{
                ...state,
                loading:false,
                user:action.payload.user
            }
        },
        userfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updateuserrequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        updateusersuccess(state,action){
            return{
                ...state,
                loading:false,
               
                isuserupdated:true
            }
        },
        updateuserfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteuserrequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        deleteusersuccess(state,action){
            return{
                ...state,
                loading:false,
                isuserdeleted:true
            }
        },
        deleteuserfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearuserupdated(action,state){
            return{
                ...state,
                isuserupdated:false
            }
        },
        clearuserdeleted(action,state){
            return{
                ...state,
                isuserdeleted:false
            }
        }
    }
})
const {actions,reducer}=Userslice
export const{
    usersrequest,userssuccess,usersfail,
    userrequest,usersuccess,userfail,
    updateuserrequest,updateusersuccess,updateuserfail,
    deleteuserrequest,deleteusersuccess,deleteuserfail,
    clearerror,clearuserdeleted,clearuserupdated
}=actions
export default reducer;