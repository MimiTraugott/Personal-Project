import React, { Component } from "react";
import axios from "axios";

class CartItem extends Component {
  state = {
    quantity: this.props.data.qty,
    editing: false
    // price: this.props.data.price
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = current_cart_id => {
    axios
      .put(
        `/api/cart?current_cart_id=${current_cart_id}&qty=${this.state.quantity}`
      )
      .then(res => {
        alert("Your new quantity has been saved");
        this.toggleEdit();
      })
      .catch(err => alert("there was an error in updating your item"));
  };

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
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
          disabled={!this.state.editing}
          onChange={e => this.handleChange(e)}
          type="number"
          name="quantity"
          value={this.state.quantity}
          min="1"
          max="20"
        ></input>
        <button onClick={() => this.props.deleteItem(product_id)}>
          Remove from Cart
        </button>
        {this.state.editing ? (
          <button
            onClick={() => this.handleSave(this.props.data.current_cart_id)}
          >
            Save
          </button>
        ) : (
          <button onClick={() => this.toggleEdit()}>Edit</button>
        )}
      </div>
    );
  }
}
export default CartItem;
