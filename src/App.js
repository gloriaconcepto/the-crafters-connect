import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';


import Nav from './components/NavComponent/Nav';
import Root from './components/Root';
import Footer from './components/Footer';
import './index.css';

//check for Token
if(localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired Token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //clear current profile

    //redirect to login
    window.location.href = './signup';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Nav />
            <Root/>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
