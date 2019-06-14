import React from "react";
import ReactDOM from "react-dom";

import "./static/scss/app.scss";

import Actions from "./libs/actions";
import Auth from "./libs/auth";
import Authenticate from './libs/authenticate'

import Layout from "./Layout";

const main = async () => {
  // let actions = await Actions("https://api.chips.gg");
  // let actions = await Actions("https://api.322esport.com");
  let actions = await Actions("http://45.63.17.87:9991");

  const user = await Authenticate(actions)

  // kinda hacky
  // const auth = Auth("https://auth.chips.gg");
  // const auth = Auth("https://auth.322esport.com");
  const auth = Auth("http://45.63.17.87:9993");

  actions = {...actions, ...auth}

  return ReactDOM.render(
    <Layout user={user} actions={actions} />,
    document.getElementById("app")
  );
};

main();
