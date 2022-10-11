import React from "react";
import Home from "./pages/Home";
import List from "./pages/List";
import Timeline from "./pages/Timeline";
import User from "./pages/User";
import Categories from "./pages/Categories";

const Routes = {
  "/": () => <List />,
  "/add": () => <Home />,
  "/timeline": () => <Timeline />,
  "/user": () => <User />,
  "/categories": () => <Categories />,
};
export default Routes;
