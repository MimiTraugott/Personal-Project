import React from "react";
import Menu from "./Components/Menu";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import OrderPage from "./Components/OrderPage";
import AboutChip from "./Components/AboutChip"
import { Switch, Route } from "react-router-dom";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/menu" component={Menu} />
    <Route path="/login" component={Login} />
    <Route path="/orderpage" component={OrderPage} />
    <Route path="/aboutchip" component={AboutChip} />
  </Switch>
);
