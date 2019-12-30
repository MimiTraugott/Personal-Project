import React from 'react'
import ShoppingCart from './ShoppingCart'
import {Link, useLocation} from 'react-router-dom'


function Header(){
    const location = useLocation()
return(
    <div>
        <div className='header'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div class="topnav">
        <a href="/" >Logo</a>
        <Link to='/about'>
        <a href="javascript:void(0);" class="icon">
            <i class="fa fa-bars"></i>
        </a>
        </Link>
        </div>
        <ShoppingCart/>
        </div>
        
    </div>
)
}
export default Header