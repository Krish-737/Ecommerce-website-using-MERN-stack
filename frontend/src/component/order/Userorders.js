import { Fragment, useEffect } from "react";
import Metadata from "../layout/Metadata";
import {MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from "react-redux";
import { userorders as userorderaction} from "../actions/orderaction";
import { Link } from "react-router-dom";

export default function Userorder(){
    const {userorders=[]}=useSelector(state=>state.orderstate)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(userorderaction)
    },[dispatch])
    const setorders=()=>{
        const data={
            columns:[
                {
                    label:"Order ID",
                    field:'id',
                    sort:"asc"
                },
                {
                    label:"Number Of Items",
                    field:'numofitems',
                    sort:"asc"
                },
                {
                    label:'AMOUNT',
                    field:'amt',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                },
            ],
            rows:[]
        }
        userorders.forEach(userorder => {
            data.rows.push({
                id:userorder._id,
                numofitems:userorder.orderitems.length,
                amt:`$${userorder.totalprice}`,
                status:userorder.orderstatus&&userorder.orderstatus.includes('Delivered')?
                (<p style={{color:'green'}}>{userorder.orderstatus}</p>):
                (<p style={{color:'red'}}>{userorder.orderstatus}</p>),
                actions:<Link to={`/order/${userorder._id}`} className="btn btn-primary">
                    <i className="fa fa-eye"></i>
                </Link>



            })
            
        });
            
            return data;
        
    }
    return(
        <Fragment>
            <Metadata title={'My Orders'}/>
            <h1 className="mt-5">MY ORDER</h1>
            <MDBDataTable
            className="px-5"
            bordered
            striped
            hover
            data={setorders()}
            />
        </Fragment>
    )
}