import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import SignUp from "../authentication/signUp";
import SignIn from "../authentication/signIn";
import SignOut from "../authentication/signOut";
import { Container } from "semantic-ui-react";
import Auth from "../authentication/auth";
import Home from "../company/home";
import Navigation from "../company/navigation";
import CreateCompany from "../company/createCompany";
import "./App.css";
import Inventory from "../inventory/inventory";

function App({ isSignedIn }) {
  return (
    <Router>
      <div className="App">
        <div>
          { isSignedIn ? (<Navigation />) : (null) }
        </div>
        <Container className="marginTop" textAlign="justified">
          <Switch>
            <Route path="/home" exact component={isSignedIn ? Home : Auth} />
            <Route path="/company/create" exact component={isSignedIn ? CreateCompany : Auth} />
            <Route path="/inventory" exact component={Inventory} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/logout" component={SignOut} />
            <Route path="/" exact component={isSignedIn ? Home : Auth} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  const { isSignedIn } = state.reduxTokenAuth.currentUser;
  return { isSignedIn };
}

export default connect(mapStateToProps)(App);
