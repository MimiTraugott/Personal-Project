import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <div>
      <div className="header">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="topnav">
          
          <Link to="/">
            <img
              className="landing-logo-image"
              src={
                location.pathname === "/"
                  ? "//cdn.shopify.com/s/files/1/1582/4389/files/chip_white_x95.png?v=1524535516"
                  : "https://cdn.shopify.com/s/files/1/1582/4389/files/chip_gold_x95.png"
              }
              alt="chip cookies"></img>
          </Link>
          <Link to="/menu">
            <a href="javascript:void(0);" class="icon">
              <i
                class="fa fa-bars"
                style={
                  location.pathname === "/"
                    ? { color: "white" }
                    : { color: "#edc646" }
                }
              ></i>
            </a>
          </Link>
        </div>
        <Link to="/shoppingcart">
          <button id="shoppingcart">ShoppingCart</button>
        </Link>
      </div>
    </div>
  );
}
export default Header;
