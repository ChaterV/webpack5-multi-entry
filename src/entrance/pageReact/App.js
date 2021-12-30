import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageReact from "@/components/pageReact";

const App = () => {
  return (
    <Router>
        <Switch>
            <Route path='/' component={PageReact} />
        </Switch>
    </Router>
  );
}

export default App;
