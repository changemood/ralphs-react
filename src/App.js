import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import BeforeAuth from './hoc/Layout/BoforeAuth/BeforeAuth'
import SignUp from './containers/Auth/SignUp/SignUp'
import Login from './containers/Auth/Login/Login'
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="App">
        <BeforeAuth>
          {routes}
        </BeforeAuth>
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
