import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {countries} from "countries-list"
import { saveShippinginfo } from "../slices/cartslice";
import {  useNavigate } from "react-router-dom";
import Checkoutstep from "./checkoutstep";
import { toast } from "react-toastify";

export const validateshipping=(shippinginfo,navigate)=>{
    //const navigate=useNavigate()
    //const {shippinginfo}=useSelector(state=>state.cartstate)
    if(!shippinginfo.address||
        !shippinginfo.phoneno||
        !shippinginfo.postalcode||
        !shippinginfo.city||
        !shippinginfo.country||
        !shippinginfo.state){
        toast.error('Please fill the shipping information')
        navigate('/shipping')
    }
        
}

export default function Shipping(){
    const {shippinginfo=''}=useSelector(state=>state.cartstate)
    const[address,setaddress]=useState(shippinginfo.address)
    const[phoneno,setphoneno]=useState(shippinginfo.phoneno)
    const[postalcode,setpostalcode]=useState(shippinginfo.postalcode)
    const[country,setcountry]=useState(shippinginfo.country)
    const[state,setstate]=useState(shippinginfo.state)
    const[city,setcity]=useState(shippinginfo.city)

    const countrylist=Object.values(countries)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippinginfo({address,city,postalcode,state,country,phoneno,}))
        navigate('/order/confirm')
    }
   
    return(
        <Fragment>
            <Checkoutstep shipping/>
                <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submithandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setaddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e)=>setcity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneno}
                                onChange={(e)=>setphoneno(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalcode}
                                onChange={(e)=>setpostalcode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=>setcountry(e.target.value)}
                                required
                            >
                                {countrylist.map((country,i)=>
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                   
                                   )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e)=>setstate(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}