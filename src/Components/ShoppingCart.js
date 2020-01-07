import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCart } from '../redux/cartReducer';
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import CartItem from "./CartItem";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      quantity: 1
    };
  }

  componentDidMount() {
    this.getCart();
    this.getProducts();
  }

  deleteItem = id => {
    axios.delete(`/api/cart/${id}`).then(res => {
      alert("Cookie Deleted");
      this.getCart();
    });
  };

  getProducts = () => {
    console.log(this.props)
    axios
      .get("/api/products")
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => console.log(err));
  };

  getCart = () => {
    axios
      .get(`/api/cart/${this.props.user.customer_id}`)
      .then(res => {
        console.log(res.data);
        this.props.setCart(res.data);
      })
      .catch(err => console.log);
  };
  render() {
    //calculate cart total
    let total = this.props.cart.cart.map(el => (
      el.price * el.qty
    )).reduce((acc, cur) => (
      acc+cur
    ), 0)
    console.log(total);

    return (
      <div>
        <div>
          {this.props.cart.cart.length ? this.props.cart.cart.map((el, i) => (
            <CartItem data={el} key={i} deleteItem={this.deleteItem} />
          )): null}
        </div>
          <h1>Cart Total ${total}</h1>
        <Link to="/orderpage">
          <button>Keep Shopping</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, {setCart})(ShoppingCart);
