import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Signup from './components/Signup'
import Login from './components/Login'
import "./App.css";
import Header from "./components/Header";
import Tickets from "./components/Tickets";
import TicketDetails from "./components/TicketDetails";
import EditTicket from "./components/EditTicket";

function App() {
  return (
    <div className="App">
      <Route component={Header} />
      <Route exact path="/" component={MainPage} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path='/events/:eventId/tickets' component={Tickets} />
      <Route path='/ticketDetails/:eventId/:ticketId' component={TicketDetails} />
      <Route path='/edit/:ticketId' component={EditTicket} />
    </div>
  );
}

export default App;
