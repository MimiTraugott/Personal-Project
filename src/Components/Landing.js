import React from "react";
import {Link} from 'react-router-dom'

function Landing() {
  return (
    <div>
      <div className="landingContainer">
        <div className="landingCenter">
          <div className="businessName">Chip Cookies</div>
          <Link to="/orderpage">
          <button id="landingButton">Order Now</button>
          </Link>
        </div>
      </div>
      <div className="lowerLanding">
        <div className="lowerLandingImage"></div>
        <div className="landingOrder">
          <h1>Order Chip Cookies</h1>
          <form>
          <label>
            Cookie:
            <input id="landingordercookieinput" name="Cookie" placeholder="Cookie">
            </input>
          </label>
          <label>
           Boxes:
            <input id="landingorderqty" name="qty" placeholder="qty"></input>
          </label>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Landing;
