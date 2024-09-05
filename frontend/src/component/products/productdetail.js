

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createreview, getproduct } from "../actions/productaction";
import { useParams} from "react-router-dom"
import Loader from "../layout/Loader";
import{Carousel, CarouselItem, Modal} from "react-bootstrap"
import Metadata from "../layout/Metadata";
import { addcartitem } from "../actions/cartaction";
import { toast } from "react-toastify";
import { clearproduct, clearreviewerror, clearreviewsubitted } from "../slices/productslice";
import Productreview from "./Productreview";


export default function Productdetail(){
    const{product={},loading,isreviewsubmitted,error}=useSelector((state)=>state.productstate)
    const {user}=useSelector(state=>state.authstate)
    
    const dispatch=useDispatch()

    const {id}=useParams()
    const[quantity,setquantity]=useState(1)

    const increaseqty=()=>{
        const count=document.querySelector('.count')
        if(product.stock===0||count.valueAsNumber>=product.stock) return;
        const qty=count.valueAsNumber+1
        setquantity(qty)
    }
    const decreaseqty=()=>{
        const count=document.querySelector('.count')
        if(count.valueAsNumber===1) return;
        const qty=count.valueAsNumber-1
        setquantity(qty)
    }
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating,setrating]=useState('1')
  const [comment,setcomment]=useState()

  const reviewhandler=()=>{
    const formdata=new FormData()
    formdata.append('rating',rating)
    formdata.append('comment',comment)
    formdata.append('productid',id)
    dispatch(createreview(formdata))
  }
    

    useEffect(()=>{
        if(isreviewsubmitted){
            handleClose()
            toast.success('Review submitted successfully',{
                onOpen:()=>{dispatch(clearreviewsubitted())}
            })
            
        }
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearreviewerror())}
            })
        }
        if(!product._id||isreviewsubmitted){
        dispatch(getproduct(id))
        }
        return ()=>{
            dispatch(clearproduct())
        }

    },[dispatch,isreviewsubmitted,error,id])

    return(
        
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                    <Metadata title={product.name}/>
        
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                 <Carousel pause="hover">
                    {product.images && product.images.map(image=>
                        <CarouselItem key={image._id}>
                                <img src={image.image} alt={product.name} height="500" width="500"/>
                        </CarouselItem>
                        )}
                 </Carousel>
                
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product_id: {product._id}</p>

                <hr/>
                
                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${(product.ratings/5)*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews}Reviews)</span>

                <hr/>

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseqty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseqty}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
                 disabled={product.stock===0?true:false} 
                 onClick={()=>{
                    dispatch(addcartitem(product._id,quantity))
                    toast.success('Cart item Added!')
                 }}
                 
                 >
                    Add to Cart</button>

                <hr/>

                <p>Status: <span className={product.stock >0 ?'greenColor':'redColor'} id="stock_status">{product.stock>0 ?'In Stock':'Out Of Stock'}</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				{user?
				<button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>:
                <div className="alert alert-danger mt-4">Login to Submit Review</div>
                }
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                       
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                        <ul className="stars" >
                                            {
                                                [1,2,3,4,5].map(star=>(
                                                    <li 
                                                    
                                                    value={star}
                                                    onClick={()=>setrating(star)}
                                                    className={`star ${star<=rating?'orange':''}`}
                                                    onMouseOver={(e)=>e.target.classList.add('yellow')}
                                                    onMouseOut={(e)=>e.target.classList.remove('yellow')}
                                                    ><i className="fa fa-star"></i></li>
                                                ))
                                            }
                                            
                                            
                                        </ul>

                                        <textarea onChange={(e)=>setcomment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                        </textarea>
                                        <button onClick={reviewhandler} aria-label="Close" id="review_btn"className="btn my-3 float-right  px-4 text-white" >Submit</button>
                            </Modal.Body>
                           
                        </Modal>

                    </div>
						
            </div>

        </div>

    </div>
    {
        product.reviews && product.reviews.length >0?    
    <Productreview reviews ={product.reviews}/>:null
    }
                </Fragment>
            }
        </Fragment>

    )
}