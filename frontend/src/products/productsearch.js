import { Fragment, useEffect, useState } from "react";
import Metadata from "../component/layout/Metadata";
import { getproducts } from "../products/productsaction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/layout/Loader";
import Product from "../products/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";

export default function Productsearch(){

  const {products,loading,error,productscount,resperpage}=useSelector((state)=>state.productsstate)

  const [currentpage,setcurrentpage]=useState(1)

  const {keyword}=useParams()

  const setcurrentpageno=((pageno)=>{
    setcurrentpage(pageno)
  })
  const dispatch=useDispatch()

  useEffect(()=>{ 
    if(error) {
      return toast.error(error,{
        
      })
    }
    
    dispatch(getproducts(keyword,currentpage))
  },[error,dispatch,currentpage,keyword])

    return (
      <Fragment>
        {loading ? <Loader /> : 
          <Fragment>
            <Metadata title={"Buy Products"} />
            <h1 id="products_heading">Search Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map(product => (
                  <Product key={product._id}product={product}/>
                  ))}
              </div>
            </section>
            {productscount>0 && productscount>resperpage?
            <div className="d-flex justify-content-center mt-5">
                    <Pagination
                    activePage={currentpage}
                    onChange={setcurrentpageno}
                    totalItemsCount={productscount}
                    itemsCountPerPage={resperpage}
                    nextPageText={'Next'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                    />
            </div >:null}
          </Fragment>
        }
      </Fragment>
    );
}