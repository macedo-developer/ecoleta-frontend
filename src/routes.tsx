import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreatePoint from "./pages/CreatePoint";
import ListPoints from "./pages/ListPoints";
import PointDetail from "./pages/PointDetail";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
      <Route component={ListPoints} path="/list-points" />
      <Route component={PointDetail} path="/detail-point" />
    </BrowserRouter>
  );
};

export default Routes;
