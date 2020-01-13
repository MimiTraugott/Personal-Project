import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        console.log(res);
        this.setState({
          products: res.data,
          selectedProductID: res.data[0].product_id
        });
      })
      .catch(err => console.log(err));
  };
  handleChange = e => {
    // console.log(e.target.value)
    this.setState({ selectedProductID: parseInt(e.target.value) });
  };

  addToCart = () => {
    axios
      .post("/api/cart", { product_id: this.state.selectedProductID })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        // console.log(err.response)
        alert(err.response.data.message);
      });
  };

  render() {
    console.log(this.state.products, this.state.selectedProductID);
    const mappedProducts = this.state.products.map((product, i) => {
      // console.log(product.product_name)
      return (
        <option key={i} value={product.product_id}>
          {product.product_name}
        </option>
      );
    });
    return (
      <div className="order-page">
        <div className="order-page-image"></div>
        <div className="order-page-form">
          <h1 className="order-h1">ORDER CHIP COOKIES</h1>
          <h3 className="order-h3-price">$10.00</h3>
          <select class="select-css" onChange={e => this.handleChange(e)}>
            {mappedProducts}
          </select>
          <div>
            <Link to="/shoppingcart">
              <button class="addtocart" onClick={this.addToCart}>
                Add to Cart
              </button>
            </Link>
            <div>
              <ul>
                Four big, warm, melt in your mouth, delicious Chip™ cookies.
                <li>
                  -OG™ — our signature gourmet award winning chocolate chip
                  cookie
                </li>
                <li>
                  -Mini OGs — our signature gourmet awarding winning chocolate
                  chip cookie miniaturized | 9 per box | |January CHIP™ OF THE
                  MONTH|
                </li>
                <li>
                  -Hot Cocoa Chip™ — gourmet cookie made with Stephen's hot
                  chocolate and stuffed with marshmallows + white chocolate
                  chips
                </li>
                <li>
                  -Fruity Pebbles Chip™ — gourmet cookie made with fruity cereal
                  + white chocolate chips
                </li>
                <li>
                  -CHIP™ REFILLABLE TIN — initial tins comes with four OG
                  cookies and can refilled with four cookies (any flavor
                  available at the time of purchase) at any chip location in
                  2020 for just $7 (plus tax).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderForm;
