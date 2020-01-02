import React, { Component } from "react";
import axios from "axios";
import OrderForm from './OrderForm/OrderForm'

class OrderPage extends Component {
  render(){
  return ( 
  <div>
    <OrderForm/>
  </div>
  )
}
}
export default OrderPage

// class OrderPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: []
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/api/products")
//       .then(res => {
//         this.setState({ products: res.data });
//       })
//       .catch(err => console.log(err));
//   }

// //   addToCart=(id,price)=> {
// //       if(this.props.customer.email){
// //           axios.post('/api/cart', {
// //               customer_order_id:
// //               this.props.customer.customer_order_id,
// //               product_id: id,
// //               price
// //           }).then(res => {
// //               window.alert('Item added to your cart')
// //           }).catch(err => console.log(err))
// //       } else {
// //           window.alert('please log in')
// //       }
// //   }

//   render() {
//     const mappedProducts = this.state.products.map((product, i) => {
//         // console.log(product.product_name)
//       return (
//         <option
//           key={i}
//           className="dropdown-menu"
//           value={product.product_name}>{product.product_name}</option>
//       );
//     });

//     return (
//       <div>
//         <div className="order-page">
//           <div>
//             <div className="order-page-image"></div>
//           </div>
//           <div className="order-page-form">
//             <h1>ORDER CHIP COOKIES</h1>
//             <select>{mappedProducts}</select>
//             <select>Qty</select>
//             <button onClick={this.addToCart}>Add to Cart</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

