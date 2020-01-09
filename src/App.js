import React, { Component } from "react";
import Header from "./Components/Header";
import { StripeProvider } from "react-stripe-elements";
import PageBackround from "./Components/PageBackground";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "./redux/reducer";
import routes from "./routes";
import axios from "axios";
import "./App.css";

require("dotenv").config();

const { REACT_APP_STRIPEPUBLISH } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn = () => {
    axios
      .get("/auth/userSession")
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(err => {
        console.log("userNotLoggedIn", err);
      });
  };

  render() {
    return (
      <StripeProvider apiKey={REACT_APP_STRIPEPUBLISH}>
        <div className="App">
          <PageBackround>
            <Header />
            {routes}
          </PageBackround>
        </div>
      </StripeProvider>
    );
  }
}

export default withRouter(connect(null, { setUser })(App));
