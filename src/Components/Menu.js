import React from "react";
import {Link} from 'react-router-dom'

function Menu(props) {
  return (
    <div>
      <div className="aboutLinks">
        <Link to="/login">
        <h1 className="aboutLogin">LOG IN</h1></Link>
        <Link to="/OrderPage">
        <h1 className="aboutOrderNow">ORDER NOW</h1></Link>
        <Link to="/aboutchip">
        <h1 className="aboutChip">ABOUT CHIP</h1></Link>
      </div>
    </div>
  );
}
export default Menu;
