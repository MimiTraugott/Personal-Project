import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import CartItem from "./CartItem";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
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
        this.setState({ cart: res.data });
      })
      .catch(err => console.log);
  };
  render() {
    console.log("quantity", this.state.quantity);
    return (
      <div>
        <div>
          {this.state.cart.map((el, i) => (
            <CartItem data={el} key={i} deleteItem={this.deleteItem} />
          ))}
        </div>
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

export default connect(mapStateToProps)(ShoppingCart);
