import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterScreen from './components/RegisterScreen'
import SignInScreen from './components/SignInScreen'
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react'

function App() {
  return (
  	// if signed in, layout comes here, else use no templte only signin/signup form
    <div>
	    <Menu>
		    <Menu.Item
		      name='editorials'
		    >
		      Editorials
		    </Menu.Item>

		    <Menu.Item name='reviews'>
		      Reviews
		    </Menu.Item>

		    <Menu.Item
		      name='upcomingEvents'
		    >
		      Upcoming Events
		    </Menu.Item>
	  	</Menu>
	      
	    <Router>
	      <div className="App">
	      	<div className='main_container'></div>
	        <Route path="/" exact component={SignInScreen} />
	        <Route path="/signup" exact component={RegisterScreen} />
	      </div>
	    </Router>
    </div>
  );
}

export default App;
