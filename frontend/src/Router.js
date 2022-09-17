import React from "react";
import Home from "./pages/Home";
import List from "./pages/List";

const Routes = {
  "/": () => <Home />,
  "/list": () => <List />,
};
export default Routes;
