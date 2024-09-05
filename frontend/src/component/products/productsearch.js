import { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import { getproducts } from "../actions/productsaction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import Tooltip from "rc-tooltip"
import "rc-tooltip/assets/bootstrap.css"

export default function Productsearch(){

  const {products,loading,error,productscount,resperpage}=useSelector((state)=>state.productsstate)

  const categories=[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
  ]

  const [currentpage,setcurrentpage]=useState(1)
  const [price,setprice]=useState([1,1000])
  const [pricechanged,setpricechanged]=useState(price)
  const [category, setcategory]=useState("")
  const [ratings,setratings]=useState("")

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
    
    dispatch(getproducts(keyword,pricechanged,category,ratings,currentpage))
  },[error,dispatch,currentpage,pricechanged,keyword,ratings,category])

    return (
      <Fragment>
        {loading ? <Loader /> : 
          <Fragment>
            <Metadata title={"Buy Products"} />
            <h1 id="products_heading">Search Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                <div className="col-6 col-md-3 my-5">
                  <div className="px-5" onMouseUp={()=>{setpricechanged(price)}}>
                    <Slider
                    range={true}
                    marks={
                      {
                        1:"$1",
                        1000:"$1000"
                      }
                    }
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price)=>{
                      setprice(price)
                    }}
                    handleRender={
                      renderProps=>{
                        return(
                          <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                          <div {...renderProps.props}></div>
                          </Tooltip>
                        )
                      }
                    }
                    />

                  </div>
                  <hr className="my-5"/>
                  <div className="mt-3">
                    <h3>Categories</h3>
                    <ul className="pl-0">
                      {categories.map(category=>
                      <li
                      style={{
                        cursor:"pointer",
                        listStyle:"none"
                      }}
                      key={category}
                      onClick={()=>{
                        setcategory(category)
                      }}
                      >
                        {category}
                      </li>
                      )}
                    </ul>
                  </div>
                  <hr className="my-5"/>
                  <div>
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="pl-0">
                      {[5,4,3,2,1].map(star=>
                      <li
                      style={{
                        cursor:"pointer",
                        listStyle:"none"
                      }}
                      key={star}
                      onClick={()=>{
                        setratings(star)
                      }}
                      >
                      <div className="rating-outer">
                        <div className="rating-inner" style={{width:`${star*20}%`}}>

                        </div>

                      </div>
                      </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                
                <div className="col-6 col-md-9">
                  <div className="row">
                  {products &&
                  products.map(product => (
                  <Product col={4}key={product._id}product={product}/>
                  ))}
                  </div>

                  </div>
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