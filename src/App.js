import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import apiCalls from "./utilities/apiCalls";

import NavBar from "./components/NavBar";
import Index from "./components/Index";
import New from "./components/New";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/transactions/new">
              <New />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
