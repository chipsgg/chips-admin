import React from "react";
import { Redirect, HashRouter, Switch, Route } from "react-router-dom";

import { Pane } from "evergreen-ui";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";

import Pages from "./pages";

const Layout = ({ actions, user }) => (
  <HashRouter>
    <Pane display="flex" flexDirection="column">
      <Header actions={actions} user={user} />
      <Pane display="flex" flexDirection="row">
        <SideMenu />
        <Switch>
          <Redirect exact from="/" to="/home" />

          {Object.keys(Pages).map(pageKey => {
            const Page = Pages[pageKey];
            if (pageKey === "NotFound") return <Route component={Page} />;
            return (
              <Route
                path={`/${pageKey}`}
                render={props => {
                  return <Page actions={actions} />;
                }}
              />
            );
          })}
        </Switch>
      </Pane>
      <Footer />
    </Pane>
  </HashRouter>
);

export default Layout;
