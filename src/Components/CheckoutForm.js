import React, { Component } from "react";
import {injectStripe,CardElement} from "react-stripe-elements";
import axios from 'axios'


require("dotenv").config();

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log(token)
    let response = await axios.post("/charge", {token});
    //pass in amount above in your axios call?
    console.log(response)
    if (response.ok) this.setState({complete:true});
  }

  render() {
      if(this.state.complete) return<h1>Purchase Complete</h1>
    return (
      <div className="checkout">
        <p>Would you like to complete your purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
