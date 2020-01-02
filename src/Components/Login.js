import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/reducer";
import axios from "axios";
import "../App.css";

class Login extends Component {
  state = {
    login_email: "",
    login_password: "",
    register_email: "",
    register_password: "",
    registering: false
  };

  onToggle = () => {
    this.setState({ registering: !this.state.registering });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // getDerivedStateFromProps = (props, state) => {
  //   console.log("test of lifecycle method", this.state);
  //   if (
  //     (state.register_email && state.register_password) ||
  //     (state.login_email && state.login_password)
  //   )
  //     this.setState({ isValid: true });
  //   else this.setState({ isValid: false });
  // };

  registerUser = () => {
    console.log("registerUser", this.state);
    const { register_email, register_password } = this.state;
    if (register_email.length == 0)
      return alert("you must insert a valid email");
    axios
      .post("/auth/register", {
        email: register_email,
        password: register_password
      })
      .then(res => {
        this.props.setUser(res.data);
        this.props.history.push("/orderpage");
      })
      .catch(err => {
        alert("signup failed");
        console.log(err);
      });
  };
  loginUser = () => {
    console.log("loginUser", this.state);
    const { login_email, login_password } = this.state;
    axios
      .post("/auth/login", { email: login_email, password: login_password })
      .then(res => {
        console.log("hit login success", res.data);
        this.props.setUser(res.data);
        this.props.history.push("/orderpage");
      })
      .catch(err => {
        alert("login failed");
        console.log(err);
      });
  };

  render() {
    const {
      login_email,
      login_password,
      register_password,
      register_email
    } = this.state;
    //   console.log(this.state)
    console.log(this.props);
    return (
      <div>
        {this.state.registering ? (
          <div>
            <div>
              <h1>Create Account</h1>
            </div>
            <div>
              <input
                value={register_email}
                name="register_email"
                onChange={e => this.handleChange(e)}
                placeholder="email"
                id="loginemailinput"
              ></input>
            </div>
            <div>
              <input
                value={register_password}
                type="password"
                name="register_password"
                onChange={e => this.handleChange(e)}
                placeholder="password"
                id="loginpasswordinput"
              ></input>
            </div>
            <div className="sign-in-outer">
              <div className="sign-in-register">
                <button onClick={this.registerUser} id="signinbutton">
                  Create Account
                </button>
                <h4 onClick={this.onToggle}>Back to Login</h4>
              </div>
            </div>
          </div>
        ) : (
          <div id="loginheader">
            <h1>Log In</h1>

            <div>
              <input
                value={login_email}
                name="login_email"
                onChange={e => this.handleChange(e)}
                placeholder="email"
                id="loginemailinput"
              ></input>
            </div>
            <div>
              <input
                value={login_password}
                type="password"
                name="login_password"
                onChange={e => this.handleChange(e)}
                placeholder="password"
                id="loginpasswordinput"
              ></input>
            </div>
            <div className="sign-in-outer">
              <div className="sign-in-register">
                <button onClick={this.loginUser} id="signinbutton">
                  Sign In
                </button>
                <h4 onClick={this.onToggle}>Create Account</h4>
              </div>
              <h4>Forgot Your Password?</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { setUser })(Login);
