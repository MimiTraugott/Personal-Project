import React, { Component } from "react";
import { connect } from "react-redux";
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
    this.getProducts()
  }

  deleteItem = id => {
    axios.delete(`/api/cart/${id}`).then(res => {
      alert("Cookie Deleted");
      this.getCart();
    });
  };

  getProducts =()=> {
    axios
    .get("/api/products")
    .then(res => {
      console.log(res)
      this.setState({ products: res.data });
    })
    .catch(err => console.log(err));
  }

  getCart = () => {
    axios
      .get(`/api/cart/${this.props.user.customer_id}`)
      .then(res => {
        this.setState({ cart: res.data });
      })
      .catch(err => console.log);
  };
 
  // priceChanger=(price, id)=>{
  //   let index=this.state.cart.findIndex(el=>el.product_id===id)
  //   let test=this.state.cart[index].price
  //     this.setState({
  //       cart:[...this.state.cart, test: this.state.quantity*price]
  //     })
  // }

  render() {
    console.log("quantity", this.state.quantity);
    return (
      <div>
        {this.state.cart.map((el,i) => (
        <CartItem data={el} key={i} deleteItem={this.deleteItem}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(ShoppingCart);
