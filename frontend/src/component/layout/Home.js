import { Fragment, useEffect, useState } from "react";
import Metadata from "./Metadata";
import { getproducts } from "../actions/productsaction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Product from "../products/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination"

export default function Home(){

  const {products,loading,error,productscount,resperpage}=useSelector((state)=>state.productsstate)

  const [currentpage,setcurrentpage]=useState(1)

  const setcurrentpageno=((pageno)=>{
    setcurrentpage(pageno)
  })
  const dispatch=useDispatch()

  useEffect(()=>{ 
    if(error) {
      return toast.error(error,{
        
      })
    }
    
    dispatch(getproducts(null,null,null,null,currentpage))
  },[error,dispatch,currentpage])

    return (
      <Fragment>
        {loading ? <Loader /> : 
          <Fragment>
            <Metadata title={"Buy Products"} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map(product => (
                  <Product col={3} key={product._id}product={product}/>
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