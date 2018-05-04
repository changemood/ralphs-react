import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Input, Icon, Divider } from 'antd'

import Button from 'antd/lib/button';
import GoogleSignIn from '../../../components/Auth/GoogleSignIn';
import 'antd/lib/button/style/index.css'
import * as actions from '../../../store/actions/index';
import classes from '../Auth.module.css'

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const authData = {
          user: {
            login: values.email,
            password: values.password
          }
        }
        this.props.onSignUp(authData)
      }
    })
  }

  responseGoogle = (response) => {
    this.props.onHanleGoogleAuth(response.Zi.access_token)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    const error = this.props.error ? <p>{this.props.error.email[0]}</p> : null
    return (
      <Form onSubmit={this.handleSubmit} className={classes.Auth}>
        <GoogleSignIn responseGoogle={this.responseGoogle} text="Sign in with Google"/>
        <Divider>or</Divider>
        <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, pattern: /.+?@.+?\..+?/, message: 'Your email is invalid' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 8, whitespace: true }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )
            }
        </FormItem>
        {error}
        <Button type="primary" htmlType="submit" className={classes.AuthButton} loading={this.props.loading} disabled={this.props.loading}>
          Login
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (authData) => dispatch( actions.auth(authData, 'login') ),
    onHanleGoogleAuth: (accessToken) => dispatch( actions.hanleGoogleAuth(accessToken) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))