import { applyMiddleware,  combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsreducer from "./component/slices/productsslice"
import productreducer from "./component/slices/productslice"
import authreducer from "./component/slices/authslice"
import cartreducer from "./component/slices/cartslice"
import orderreducer from "./component/slices/orderslice"
import userreducer from "./component/slices/Userslice"

const reducer=combineReducers({
    productsstate:productsreducer,
    productstate:productreducer,
    authstate:authreducer,
    cartstate:cartreducer,
    orderstate:orderreducer,
    userstate:userreducer
})

const store=configureStore({
    reducer,
    middleware:applyMiddleware[thunk]
    

})

export default store;