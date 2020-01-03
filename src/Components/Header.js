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
                  : "//www.globenewswire.com/news-release/logo/574493/0/574493.jpg?lastModified=11%2F08%2F2018%2013%3A33%3A16&size=2&v=1648395"
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
