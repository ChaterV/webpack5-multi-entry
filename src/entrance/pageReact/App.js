import React from "react";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import PageReact from "@/components/pageReact";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<PageReact/>} />
          </Routes>
      </Router>
  );
}

export default App;
