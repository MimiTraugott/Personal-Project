import React, { Component } from "react";
import {Link} from 'react-router-dom'
import OrderForm from './OrderForm/OrderForm'
import axios from "axios";

class Landing extends Component {
  constructor (){
    super()
    this.state = {
      products: []
    }
  }
  // componentDidMount(){
  //   axios.get('/api/products')
  //   .then(res => {
  //     this.setState({products:res.data})
  //   })
  //   .catch(err => console.log(err))
  // }
  render(){
    // const mappedProducts = this.state.products.map((product,i) => {
    //   return (
    //     <option 
    //     key={i}
    //     className="landing-order-dropdown-menu"
    //     value={product.product_name}>{product.product_name}</option>
    //   )
    // })
  return (
    <div>
      <div className="landingContainer">
        <div className="landingCenter">
          <div className="businessName">Chip Cookies</div>
          <Link to="/orderpage">
          <button id="landingButton">Order Now</button>
          </Link>
        </div>
      </div>
      <OrderForm/>
      {/* <div className="lowerLanding">
        <div className="lowerLandingImage"></div>
        <div className="landingOrder">
          <h1>Order Chip Cookies</h1>
          <select>{mappedProducts}</select>
          <button>Add to Cart</button>
        
        </div>
      </div> */}
    </div>
  );
}
}
export default Landing;
