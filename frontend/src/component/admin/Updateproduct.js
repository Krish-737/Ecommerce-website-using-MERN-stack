import { Fragment, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from "react-redux"
import {  useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { clearisupdated, updateerror } from "../slices/productslice"

import { updateproduct } from "../actions/productsaction"
import { getproduct } from "../actions/productaction"


export default function Updateproduct(){

    const {loading,isproductupdated,error,product={}}=useSelector(state=>state.productstate)
    
    const dispatch=useDispatch()
    const{id:productid}=useParams()

    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [description,setdescription]=useState("")
    const [stock,setstock]=useState(0)
    const [category,setcategory]=useState('')
    const [seller,setseller]=useState("")
    const [images,setimages]=useState([])
    const [preview,setpreview]=useState([])
    const[imagescleared,setimagescleared]=useState(false)
    const Category=[
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
    const imageschange=(e)=>{
        const files=Array.from(e.target.files)
        files.forEach(file=>{
            const reader=new FileReader()

            reader.onload=()=>{
                if(reader.readyState===2){
                    setpreview(oldarray=>[...oldarray,reader.result])
                    setimages(oldarray=>[...oldarray,file])
                    
                }
            }
            reader.readAsDataURL(file)
        })

    }
    const submithandler=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('name',name)
        formdata.append('price',price)
        formdata.append('description',description)
        formdata.append('stock',stock)
        formdata.append('seller',seller)
        formdata.append('category',category)
        images.forEach(image=>{
            formdata.append('images',image)
        })
        formdata.append('imagescleared',imagescleared)

        dispatch(updateproduct(productid,formdata))

    }
    const clearimages=()=>{
        setimages([])
        setpreview([])
        setimagescleared(true)
    }
    useEffect(()=>{
        
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(updateerror())}
            })
            return;
        }
        
        if(isproductupdated){
            toast.success('Product Updated Successfully',{
                onOpen:()=>{dispatch(clearisupdated())}
            })
            setimages([])
            
            return;
        }
        dispatch(getproduct(productid))

        
    },[error,isproductupdated,dispatch,productid])

    useEffect(()=>{
        if(product._id){
            setname(product.name)
            setprice(product.price)
            setcategory(product.category)
            setdescription(product.description)
            setseller(product.seller)
            setstock(product.stock)
            let images=[]
            product.images.forEach(image=>{
                images.push(image.image)
            })
            setpreview(images)
        }
    },[product])
    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
                <div className="col-12 col-md-10">
            
                     <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={submithandler} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={e=>setname(e.target.value)}
                                />
                                </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                value={price}
                                onChange={e=>setprice(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" 
                                    value={description}
                                    onChange={e=>setdescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select value={category} onChange={e=>setcategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {Category.map(cat=>(
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                value={stock}
                                onChange={e=>setstock(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                value={seller}
                                onChange={e=>setseller(e.target.value)}
                                />
                            </div>
                
                            <div className='form-group'>
                                <label>Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={imageschange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {preview.length>0&& <span className="mr-2" onClick={clearimages} style={{cursor:"pointer"}}><i className="fa fa-trash"></i></span>}
                                    {preview.map(i=>(
                                        <img
                                        className="mt-3 mr-2"
                                        key={i}
                                        src={i}
                                        alt={'preview'}
                                        width='55'
                                        height='55'
                                        />
                                    ))}                                    
                            </div>
                                    <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block py-3"
                                    >
                                    UPDATE
                                    </button>
                            </form>
                        </div>
                    </Fragment>
                </div>       
            </div>
        
    )
    
}