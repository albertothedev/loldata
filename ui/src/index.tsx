import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Players from "./pages/Players";

import "normalize.css";
import "./styles/main.scss";
import store from "./redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/champions" component={Champions} />

          <Route path="/players" component={Players} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
