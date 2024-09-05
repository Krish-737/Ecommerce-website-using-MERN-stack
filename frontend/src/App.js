import {  HelmetProvider } from 'react-helmet-async';
import './App.css';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Home from './component/layout/Home';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Productdetail from './component/products/productdetail';
import Productsearch from './component/products/productsearch';
import Login from './component/user/Login';
import Register from './component/user/Register';
import { useEffect, useState } from 'react';
import { loaduser } from './component/actions/useraction';
import { useDispatch } from 'react-redux';
import Profile from './component/user/Profile';
import Protectedroute from './component/route/Protectedroute';
import Updateprofile from './component/user/Updateprofile';
import Updatepassword from './component/user/Updatepassword';
import Forgotpassword from './component/user/Forgotpassword';
import Resetpassword from './component/user/Resetpassword';
import Cart from './component/cart/cart';
import Shipping from './component/cart/shipping';
import Confirmorder from './component/cart/confirmorder';
import axios from 'axios';

import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/cart/Payment';
import Order from './component/order/Order';
import Userorder from './component/order/Userorders';
import Orderdetail from './component/order/Orderdetail';
import Dashboard from './component/admin/Dashboard';
import Productlist from './component/admin/Productlist';
import Newproduct from './component/admin/Newproduct';
import Updateproduct from './component/admin/Updateproduct';
import Orderlist from './component/admin/Orderlist';
import Updateorder from './component/admin/Updateorder';
import Userlist from './component/admin/Userlist';
import Updateuser from './component/admin/Updateuser';
import Reviewlist from './component/admin/Reviewslist';







function App() {
  const [stripeapikey,setstripeapikey]=useState("")
  const dispatch=useDispatch()
  useEffect(()=>{
    async function getstripeapikey(){
      const {data}=await axios.get('/api/v1/stripeapi')
      setstripeapikey( data.stripeApikey)
    }
    getstripeapikey()
    dispatch(loaduser)
  },[dispatch])
  return (
    <Router>
      <div className="App">
            <HelmetProvider> 
              <Header/>
              <div className='container container-fluid'>
              <ToastContainer theme='dark' position='bottom-center' transition={Bounce}/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/product/:id' element={<Productdetail/>}/>
                <Route path='/search/:keyword' element={<Productsearch/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/myprofile" element={<Protectedroute><Profile/></Protectedroute> }/>
                <Route path="/profile/update" element={<Protectedroute><Updateprofile/></Protectedroute> }/>
                <Route path="/profile/update/password" element={<Protectedroute><Updatepassword/></Protectedroute> }/>
                <Route path="/password/forgot" element={<Forgotpassword/>}/>
                <Route path="/password/reset/:token" element={<Resetpassword/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/shipping" element={<Protectedroute><Shipping/></Protectedroute> }/>
                <Route path="/order/confirm" element={<Protectedroute><Confirmorder/></Protectedroute> }/>
                {stripeapikey&&
                <Route path="/payment" element={<Protectedroute><Elements stripe={loadStripe(stripeapikey)} ><Payment/> </Elements> </Protectedroute> }/>
                }
                <Route path="/order/success" element={<Protectedroute><Order/></Protectedroute> }/>
                <Route path="/myorders" element={<Protectedroute><Userorder/></Protectedroute> }/>
                <Route path="/order/:id" element={<Protectedroute><Orderdetail/></Protectedroute> }/>
                
               
              </Routes>
              </div>
              <Routes>
              <Route path="/admin/dashboard" element={<Protectedroute isadmin={true}><Dashboard/></Protectedroute> }/>
              <Route path="/admin/products" element={<Protectedroute isadmin={true}><Productlist/></Protectedroute> }/>
              <Route path="/admin/product/new" element={<Protectedroute isadmin={true}><Newproduct/></Protectedroute> }/>
              <Route path="/admin/product/:id" element={<Protectedroute isadmin={true}><Updateproduct/></Protectedroute> }/>
              <Route path="/admin/orders" element={<Protectedroute isadmin={true}><Orderlist/></Protectedroute> }/>
              <Route path="/admin/order/:id" element={<Protectedroute isadmin={true}><Updateorder/></Protectedroute> }/>
              <Route path="/admin/users" element={<Protectedroute isadmin={true}><Userlist/></Protectedroute> }/>
              <Route path="/admin/user/:id" element={<Protectedroute isadmin={true}><Updateuser/></Protectedroute> }/>
              <Route path="/admin/reviews" element={<Protectedroute isadmin={true}><Reviewlist/></Protectedroute> }/>

              </Routes>
              <Footer/>
            </HelmetProvider>
              
      </div>
        
    </Router>
  );
}

export default App;
