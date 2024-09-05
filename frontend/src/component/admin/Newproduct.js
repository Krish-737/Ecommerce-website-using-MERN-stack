import { Fragment, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createnewproduct } from "../actions/productsaction"
import { toast } from "react-toastify"
import { clearproductcreated, clearproducterror } from "../slices/productslice"

export default function Newproduct(){
    const {loading,isproductcreated,error}=useSelector(state=>state.productstate)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [description,setdescription]=useState("")
    const [stock,setstock]=useState(0)
    const [category,setcategory]=useState('')
    const [seller,setseller]=useState("")
    const [images,setimages]=useState([])
    const [preview,setpreview]=useState([])
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
        images.forEach(img=>{
            formdata.append('images',img)
        })

        dispatch(createnewproduct(formdata))

    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                onOpen:()=>{dispatch(clearproducterror())}
            })
            return;
        }
        
        if(isproductcreated){
            toast.success('Product Created Successfully',{
                onOpen:()=>{dispatch(clearproductcreated())}
            })
            navigate('/admin/products')
            return;
        }

        
    },[error,isproductcreated,dispatch,navigate])

    return(
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Product List</h1>
                     <Fragment>
                        <div className="wrapper my-5"> 
                            <form onSubmit={submithandler} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

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
                                    {preview.map(i=>(
                                        <img
                                        className="mt-3 mr-2"
                                        key={i}
                                        src={i}
                                        alt={'image_preview'}
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
                                    CREATE
                                    </button>
                            </form>
                        </div>
                    </Fragment>
                </div>       
            </div>
        
    )
}