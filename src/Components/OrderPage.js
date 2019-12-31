import React, { Component } from "react";
import axios from 'axios';


class OrderPage extends Component {
  render() {
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
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderPage;
