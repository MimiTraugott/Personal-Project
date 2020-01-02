import React, { Component } from "react";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProductID: null
    };
  }

  componentDidMount = () => {
    axios
      .get("/api/products")
      .then(res => {
        console.log(res)
        this.setState({ products: res.data, selectedProductID: res.data[0].product_id });
      })
      .catch(err => console.log(err));
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({selectedProductID: parseInt(e.target.value)})
  }

  addToCart = () => {
      axios.post("/api/cart", {product_id: this.state.selectedProductID})
      .then(res => {
          console.log(res)
      })
      .catch(err => {
          console.log(err)
      })
  }

  render() {
    console.log(this.state.products, this.state.selectedProductID)
    const mappedProducts = this.state.products.map((product, i) => {
      // console.log(product.product_name)
      return (
        <option key={i} className="dropdown-menu" value={product.product_id}>
          {product.product_name}
        </option>
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
            <select onChange={e => this.handleChange(e)}>{mappedProducts}</select>
            <select>Qty</select>
            <button onClick={this.addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderForm;
