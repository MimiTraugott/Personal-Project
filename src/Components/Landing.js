import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  render() {
    return (
        <div className="landingContainer">
          <div className="landingCenter">
            <div className="businessName">Chip Cookies</div>
            <Link to="/login">
              <button id="landingButton">Order Now</button>
            </Link>
          </div>
      </div>
    );
  }
}
export default Landing;
