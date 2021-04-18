import Graph from './Components/Graph/Graph';
import Header from './Components/Header/Header';
import ClipBoard from './Components/ClipBoard/ClipBoard';
import Selfie from './Components/Selfie/Selfie';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/clipboard">
            <ClipBoard />
          </Route>
          <Route path="/selfie">
            <Selfie />
          </Route>
          <Route path="/">
            <Graph />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
