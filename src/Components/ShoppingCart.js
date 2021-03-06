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
  let [itemsChanged, setItemsChanged] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/cart/${props.user.customer_id}`)
      .then(res => {
        props.setCart(res.data);
      })
      .catch(err => console.log);
  }, [itemsChanged]);

  const deleteItem = id => {
    axios.delete(`/api/cart/${id}`).then(res => {
      alert("Cookie Deleted");
      props.setCart(props.cart.cart.filter((item)=>{
        return item.product_id !== id
      }));
    });
  };
  console.log("cart", props.cart);
  console.log("cart.cart", props.cart.cart);

  //calculate cart total
  let total = props.cart.cart
    .map(el => el.price * el.qty)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div>
      <div>
        {props.cart.cart.length
          ? props.cart.cart.map((el, i) => (
              <CartItem
                setItemsChanged={setItemsChanged}
                data={el}
                key={i}
                deleteItem={deleteItem}
              />
            ))
          : null}
      </div>
      <div className="cart-totaling">
      <h1 className="purchase-total">Your Purchase Total Is ${total}.00</h1>
      <Link to="/orderpage">
        <button className="keep-shopping-button">Keep Shopping</button>
      </Link>
      <Elements>
        <CheckoutForm />
      </Elements>
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { setCart })(ShoppingCart);
