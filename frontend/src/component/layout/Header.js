import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown,DropdownItem,DropdownMenu,DropdownToggle,Image } from 'react-bootstrap'
import { logout } from '../actions/useraction'



export default function Header(){
  const {user,isauthenticated} =useSelector(state=>state.authstate)
  const{items:cartitems}=useSelector(state=>state.cartstate)
  const dispatch= useDispatch()
  const navigate=useNavigate()
  const logouthandler=()=>{
   dispatch(logout)
  }
    return(
      <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={'/'}>
          <img width="60px" alt="Amazeflip" src="../../images/OIP.jpeg"/>
          </Link>
        </div>
      </div>
          <div className="col-12 col-md-6 mt-2 mt-md-0 ">
            <Search/>
          </div>
      
      
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isauthenticated?
        (
          <Dropdown className='d-inline'>
              <DropdownToggle variant='default text-white pr-5' id='dropdown'>
                <figure className='avatar avatar-nav'>
                  <Image width="50px" src={user.avatar??'../../images/OIP.jpeg'}/>
                </figure>
                <span>{user.name}</span>
              </DropdownToggle>
              <DropdownMenu>
              {user.role ==='admin' && <DropdownItem onClick={()=>{navigate('/admin/dashboard')}} className='text-dark'>Dashboard</DropdownItem>}
                <DropdownItem onClick={()=>{navigate('/myprofile')}} className='text-dark'>Profile</DropdownItem>
                <DropdownItem onClick={()=>{navigate('/myorders')}} className='text-dark'>Orders</DropdownItem>
                <DropdownItem onClick={logouthandler} className='text-danger'>logout</DropdownItem>
                
              </DropdownMenu>
          </Dropdown>
        ):
          <Link to={'/login'} className="btn" id="login_btn">Login</Link>
        }
        <Link to={'/cart'}><span id="cart" className="ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartitems.length}</span>
      </div>
    </nav>
    )
}