import React, { Component } from "react";
import axios from "axios";

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const mappedProducts = this.state.products.map((product, i) => {
      return(
        <div key={i} className="product-container">
          <h1>{product.product_name}</h1>
        </div>
      );
    });
    
    return (
      <div>
        <div className="order-page">
          <div>
            <div className="order-page-image"></div>
          </div>
          <div className="order-page-form">
            <h1>ORDER CHIP COOKIES</h1>
            <input type="text"></input>
            <input type="text"></input>
            <button>Add to cart</button>
            {mappedProducts}
          </div>
        </div>
      </div>
    );
  }
}
export default OrderPage;
