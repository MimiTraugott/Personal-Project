import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "axios";
import "../App.css";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/cart/${this.props.user.customer_id}`)
      .then(res => {
        this.setState({ cart: res.data });
      })
      .catch(err => console.log);
  }

  render() {
    console.log('shopping cart', this.state.cart)
    return (
      <div>
        {this.state.cart.map(el => (
          <div>
            <h1>{el.product_name}</h1>
            <img src={el.product_image} alt="Cookies"></img>
            <h3>{el.product_description}</h3>
          </div>
        ))}
      </div>
    );
  }
}

    const mapStateToProps = reduxState => {
      return reduxState
    }

export default connect(mapStateToProps)(ShoppingCart);
