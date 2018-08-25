import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import BeforeAuth from './hoc/Layout/BoforeAuth/BeforeAuth'
import AfterAuth from './hoc/Layout/AfterAuth/AfterAuth'
import SignUp from './containers/Auth/SignUp/SignUp'
import Login from './containers/Auth/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard'
import Boards from './containers/Boards/Boards'
import Board from './containers/Boards/Board/Board'
import User from './containers/User/User'
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <BeforeAuth>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      </BeforeAuth>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <AfterAuth>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/user" exact component={User} />
            <Route path="/boards" exact component={Boards} />
            <Route path="/boards/:id" exact component={Board} />
            <Redirect to="/dashboard" />
          </Switch>
        </AfterAuth>
      )
    }

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
