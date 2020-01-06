import React, { Component } from "react";
import Header from "./Components/Header";
import PageBackround from "./Components/PageBackground";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "./redux/reducer";
import routes from "./routes";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn = () => {
    console.log("hit");
    axios
      .get("/auth/userSession")
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <PageBackround>
          <Header />
          {routes}
        </PageBackround>
      </div>
    );
  }
}

export default withRouter(connect(null, { setUser })(App));
