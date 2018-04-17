import React, { Component } from 'react';
import './App.css';

import SignUp from './containers/Auth/SignUp/SignUp'
import Login from './containers/Auth/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUp />
        <Login />
      </div>
    );
  }
}

export default App;
