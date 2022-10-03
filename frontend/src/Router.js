import React from "react";
import Home from "./pages/Home";
import List from "./pages/List";
import Edit from "./pages/Edit";

const Routes = {
  "/": () => <Home />,
  "/list": () => <List />,
  "/edit": () => <Edit />,
};
export default Routes;
