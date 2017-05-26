import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";


// build the router
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome}/>
    <Route path="*" component={NotFound}/>      
  </Route>
);

// export
export default routes;
