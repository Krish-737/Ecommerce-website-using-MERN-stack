import { createSlice } from "@reduxjs/toolkit";



const cartslice=createSlice({
    name:'cart',
    initialState:{
        items:localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')):[],
        loading:false,
        shippinginfo:localStorage.getItem('shippinginfo')?JSON.parse(localStorage.getItem('shippinginfo')):[]
    },
    reducers:{
        addcartitemrequest(state,action){
            return{
                ...state,
                loading:true,
            
            }
        },
        addcartitemsuccess(state,action){
            const item=action.payload
            const itemexist=state.items.find(i=>i.product===item.product)
            if(itemexist){
                state={
                    ...state,
                    loading:false
                }
            }
            else{
                state={
                    items:[...state.items,item],
                    loading:false
                }
                localStorage.setItem('cartitems',JSON.stringify(state.items))
            }
            return state;
            
        },
        increasecartqty(state,action){
            state.items=state.items.map(item=>{
                if(item.product===action.payload){
                    item.quantity+=1
                }
                return item
            })
            localStorage.setItem('cartitems',JSON.stringify(state.items))
        },
        decreasecartqty(state,action){
            state.items=state.items.map(item=>{
                if(item.product===action.payload){
                    item.quantity-=1
                }
                return item
            })
            localStorage.setItem('cartitems',JSON.stringify(state.items))
        },
        removeqty(state,action){
            const filteritems=state.items.filter(item=>{
                return item.product!==action.payload

                })
                localStorage.setItem('cartitems',JSON.stringify(filteritems))
                return{
                    ...state,
                    items:filteritems

                }
        },
        saveShippinginfo(state,action){
            localStorage.setItem('shippinginfo',JSON.stringify(action.payload))
            return{
                ...state,
                shippinginfo:action.payload
            }
        },
        ordercomplete(state,action){
            localStorage.removeItem('shippinginfo')
            localStorage.removeItem('cartitems')
            
            return{
                ...state,
                items:[],
                loading:false,
                
            }
        }
        
        }

})


const {actions,reducer}=cartslice

export const {addcartitemrequest,addcartitemsuccess,
    increasecartqty,decreasecartqty,
    removeqty,
    saveShippinginfo,
    ordercomplete
}=actions

export default reducer;