import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../redux/reducer";
import axios from "axios";

function Menu(props) {
  const logout = () => {
    axios.delete("/auth/userSession").then(res => {
      props.history.push("/");
      props.setUser({});
      console.log("delete working");
    });
  };

  const isLoggedIn = props.user.user.customer_id ? true : false;
  console.log(props);
  return (
    <div>
      <div className="aboutLinks">
        {isLoggedIn ? (
          <button
            className="logout-button"
            onClick={() => {
              logout();
            }}
          >
            LOG OUT
          </button>
        ) : (
          <Link to="/login">
            <button className="aboutLogin">LOG IN</button>
          </Link>
        )}
        <Link to="/OrderPage">
          <button className="aboutOrderNow">ORDER NOW</button>
        </Link>
        <Link to="/aboutchip">
          <button className="aboutChip">ABOUT CHIP</button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
  //return {reduxState.user, reduxState.cart}
};

export default connect(mapStateToProps, { setUser })(Menu);
