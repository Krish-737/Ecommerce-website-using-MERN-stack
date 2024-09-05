import { createSlice } from "@reduxjs/toolkit";

const authslice=createSlice({
    name:'auth',
    initialState:{
        loading:true,
        isauthenticated:false
    },
    reducers:{
        loginrequest(state,action){
            return{
                ...state,
                loading:true,
            
            }
        },
        loginsuccess(state,action){
            return{
                loading:false,
                isauthenticated:true,
                user:action.payload.user
            }
        },
        loginfail(state,action){
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
        registerrequest(state,action){
            return{
                ...state,
                loading:true,
            
            }
        },
        registersuccess(state,action){
            return{
                loading:false,
                isauthenticated:true,
                user:action.payload.user
            }
        },
        registerfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        loaduserrequest(state,action){
            return{
                ...state,
                loading:true,
            
            }
        },
        loadusersuccess(state,action){
            return{
                loading:false,
                isauthenticated:true,
                user:action.payload.user
            }
        },
        loaduserfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        logoutsuccess(state,action){
            return{
                loading:false,
                isauthenticated:false,
                
            }
        },
        logoutfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updateprofilerequest(state,action){
            return{
                ...state,
                loading:true,
                isupdated:false
            
            }
        },
        updateprofilesuccess(state,action){
            return{
                ...state,
                loading:false,
                isupdated:true,
                user:action.payload.user
            }
        },
        updateprofilefail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updatepasswordrequest(state,action){
            return{
                ...state,
                loading:true,
                isupdated:false
            
            }
        },
        updatepasswordsuccess(state,action){
            return{
                ...state,
                loading:false,
                isupdated:true,
                
            }
        },
        updatepasswordfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        forgetpasswordrequest(state,action){
            return{
                ...state,
                loading:true,
                message:null
            }
        },
        forgetpasswordsuccess(state,action){
            return{
                ...state,
                loading:false,
                message:action.payload.message
            }
        },
        forgetpasswordfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        resetpasswordrequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        resetpasswordsuccess(state,action){
            return{
                ...state,
                loading:false,
                isauthenticated:true,
                user:action.payload.user
            }
        },
        resetpasswordfail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },

        }

})


const {actions,reducer}=authslice

export const {loginrequest,loginsuccess,loginfail,clearerror,
    registerrequest,registersuccess,registerfail,
    loaduserrequest,loadusersuccess,loaduserfail,
    logoutsuccess,logoutfail,
    updateprofilerequest,updateprofilesuccess,updateprofilefail,
    updatepasswordrequest,updatepasswordsuccess,updatepasswordfail,
    forgetpasswordrequest,forgetpasswordsuccess,forgetpasswordfail,
    resetpasswordrequest, resetpasswordsuccess, resetpasswordfail
}=actions

export default reducer;