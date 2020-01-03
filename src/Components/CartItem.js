import React, { Component } from "react";

class CartItem extends Component {
  state = {
    quantity: 1
    // price: this.props.data.price
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      product_name,
      product_image,
      product_description,
      price,
      product_id
    } = this.props.data;
    return (
      <div>
        <h1>{product_name}</h1>
        <img src={product_image} alt="Cookies"></img>
        <h3>{product_description}</h3>
        <h3>${price * this.state.quantity}</h3>
        <input
          onChange={e => this.handleChange(e)}
          type="number"
          name="quantity"
          min="1"
          max="20"
        ></input>
        <button onClick={() => this.props.deleteItem(product_id)}>
          Remove from Cart
        </button>
      </div>
    );
  }
}
export default CartItem;
