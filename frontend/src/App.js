import {  HelmetProvider } from 'react-helmet-async';
import './App.css';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Home from './component/layout/Home';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Productdetail from './products/productdetail';
import Productsearch from './products/productsearch';




function App() {
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
              </Routes>
              </div>
              <Footer/>
            </HelmetProvider>
              
      </div>
        
    </Router>
  );
}

export default App;
