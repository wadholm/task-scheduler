import React from "react";
import Home from "./components/Home";
import List from "./components/List";

const Routes = {
  "/": () => <Home />,
  "/list": () => <List />,
};
export default Routes;