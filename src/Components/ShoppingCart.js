import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCart } from "../redux/cartReducer";
import { Link } from "react-router-dom";
import { Elements } from "react-stripe-elements";
import axios from "axios";
import "../App.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const ShoppingCart = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: [],
  //     quantity: 1
  //   };
  // }
  const [getProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/cart/${props.user.customer_id}`)
      .then(res => {
        props.setCart(res.data);
      })
      .catch(err => console.log);
  }, []);

  useEffect(() => {
    axios
      .get("/api/products")
      .then(res => {
        getProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const deleteItem = id => {
    axios.delete(`/api/cart/${id}`).then(res => {
      alert("Cookie Deleted");
      props.setCart();
    });
  };

  // getProducts = () => {
  //   console.log(this.props)
  //   axios
  //     .get("/api/products")
  //     .then(res => {
  //       this.setState({ products: res.data });
  //     })
  //     .catch(err => console.log(err));
  // };

  // getCart = () => {
  //   axios
  //     .get(`/api/cart/${this.props.user.customer_id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       this.props.setCart(res.data);
  //     })
  //     .catch(err => console.log);
  // };

  //calculate cart total
  let total = props.cart.cart
    .map(el => el.price * el.qty)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(total);

  return (
    <div>
      <div>
        {props.cart.cart.length
          ? props.cart.cart.map((el, i) => (
              <CartItem data={el} key={i} deleteItem={deleteItem} />
            ))
          : null}
      </div>
      <h1>Cart Total ${total}</h1>
      <Link to="/orderpage">
        <button>Keep Shopping</button>
      </Link>
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { setCart })(ShoppingCart);
