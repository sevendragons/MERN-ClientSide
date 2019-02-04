import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import PrivateRoute from './components/common/PrivateRoute'

import setAuthToken from './utils/setAuthToken';
import store from './reduxLib/store/store';
import {setCurrentUser, logOutUser} from './reduxLib/action/authActions';
import { clearCurrentProfile  } from './reduxLib/action/profileActions';


//Check for token keep all information register in page
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token - after a limit time user auto logout
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logOutUser());

    // Clear current Profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login'


  }
}


//combineReducer

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <Route exact path="/" component={ Landing }></Route>
            <div className="container">
              <Route exact path="/register" component={ Register }></Route>
              <Route exact path="/Login" component={ Login }></Route>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard }></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/createProfile" component={ CreateProfile }></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/editProfile" component={ EditProfile }></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/addExperience" component={ AddExperience }></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/addEducation" component={ AddEducation }></PrivateRoute>
              </Switch>
            </div>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
