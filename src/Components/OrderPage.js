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
        // console.log(product.product_name)
      return (
        <option
          key={i}
          className="dropdown-menu"
          value={product.product_name}>{product.product_name}</option>
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
            <select>{mappedProducts}</select>
            <select>Qty</select>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderPage;
