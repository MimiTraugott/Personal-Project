import React, { Component } from "react";
import axios from "axios";

class CartItem extends Component {
  state = {
    quantity: this.props.data.qty,
    editing: false
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
        this.props.setItemsChanged(Math.random());
      })
      .catch(err => {
        console.log("edit item err", err);
        alert("there was an error in updating your item");
      });
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
    let newPrice = price * this.state.quantity;
    return (
      <div>
        <div className="cart-item-main">
          <img className="cart-image" src={product_image} alt="Cookies"></img>
          <div className="cart-items-description">
            <h1 className="cart-product">{product_name}</h1>
            <h3 className="product-description">{product_description}</h3>
            <h3 className="cart-price">${newPrice}</h3>
          </div>
          <div className="cart-inputs-and-buttons">
          <input
            className="change-qty"
            disabled={!this.state.editing}
            onChange={e => this.handleChange(e)}
            type="number"
            name="quantity"
            value={this.state.quantity}
            min="1"
            max="20"
          ></input>
          <button
            className="remove-item"
            onClick={() => this.props.deleteItem(product_id)}
          >
            Delete
          </button>
          {this.state.editing ? (
            <button
              className="edit-button"
              onClick={() => this.handleSave(this.props.data.current_cart_id)}
            >
              Save
            </button>
          ) : (
            <button className="save-button" onClick={() => this.toggleEdit()}>
              Edit
            </button>
          )}
          </div>
        </div>
      </div>
    );
  }
}
export default CartItem;
