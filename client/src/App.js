import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";

import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/search"]} component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route exact path="/noMatch" component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;