import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../redux/reducer'
import axios from "axios";

function Menu(props) {

  const logout = () => {
    axios.delete('/auth/userSession').then((res) => {
      props.history.push('/')
      props.setUser({})
      console.log('this worked???')
    })
  }

  const isLoggedIn = props.user.customer_id ? true : false;
  console.log(props)
  return (
    <div>
      <div className="aboutLinks">
        {isLoggedIn ? (
          <button
            onClick={() => {logout()}}
          >
            LOG OUT
          </button>
        ) : (
          <Link to="/login">
          <h1 className="aboutLogin">LOG IN</h1></Link>
        )}
        <Link to="/OrderPage">
        <h1 className="aboutOrderNow">ORDER NOW</h1></Link>
        <Link to="/aboutchip">
        <h1 className="aboutChip">ABOUT CHIP</h1></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  return reduxState;
  //return {reduxState.user, reduxState.cart}
}

export default connect(mapStateToProps, {setUser})(Menu);
