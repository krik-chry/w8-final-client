import React from "react";
import { Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Signup from './components/Signup'
import Login from './components/Login'
import "./App.css";
import Header from "./components/Header";
import Tickets from "./components/Tickets";

function App() {
  return (
    <div className="App">
      <Route component={Header} />
      <Route exact path="/" component={WelcomePage} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path='/events/:eventId/tickets' component={Tickets} />
    </div>
  );
}

export default App;
