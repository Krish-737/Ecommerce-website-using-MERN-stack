import { applyMiddleware,  combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsreducer from "./component/slices/productsslice"
import productreducer from "./component/slices/productslice"

const reducer=combineReducers({
    productsstate:productsreducer,
    productstate:productreducer
})

const store=configureStore({
    reducer,
    middleware:applyMiddleware[thunk]
    

})

export default store;