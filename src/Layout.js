import React from "react";
import { Redirect, HashRouter, Switch, Route } from "react-router-dom";

import { Pane } from "evergreen-ui";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Matchbet from "./pages/Matchbet";
import Users from "./pages/Users";

const Layout = ({ actions, user }) => (
  <HashRouter>
    <Pane display="flex" flexDirection="column">
      <Header actions={actions} user={user} />
      <Pane display="flex" flexDirection="row">
        <SideMenu />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route
            path="/home"
            render={props => {
              return <Home actions={actions} />;
            }}
          />

          <Route
            path="/matchbet"
            render={props => {
              return <Matchbet actions={actions} />;
            }}
          />

          <Route
            path="/users"
            render={props => {
              return <Users actions={actions} />;
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </Pane>
      <Footer />
    </Pane>
  </HashRouter>
);

export default Layout;
