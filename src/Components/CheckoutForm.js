import React, { Component, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { injectStripe, CardElement } from "react-stripe-elements";
import axios from "axios";
import { chargeComplete } from "../redux/cartReducer";

require("dotenv").config();

function CheckoutForm(props) {
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (complete) dispatch(chargeComplete());
  }, [complete]);
  const submit = async ev => {
    let { token } = await props.stripe.createToken({ name: "Name" });
    console.log(token);
    let response = await axios.post("/charge", { token });
    //pass in amount above in your axios call?
    console.log(response);
    if (response.data.status === "succeeded") {
      setComplete(true)
      axios.post('/api/email')
      .then(res => {
        console.log("email sent")
      });
    }
  };

  if (complete) return (<h1>Purchase Complete</h1>);
  return (
    <div className="checkout">
      <p>Would you like to complete your purchase?</p>
      <CardElement />
      <button className="purchase-button" onClick={submit}>Purchase</button>
    </div>
  );
}

export default injectStripe(CheckoutForm);
