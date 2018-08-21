import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd'

import * as actions from '../../store/actions/index';

class User extends Component {
  render () {
    return (
      <Button type="danger" block onClick={this.props.onLogout}>Log out</Button>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(User);