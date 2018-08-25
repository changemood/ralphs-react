import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Input, Icon, Divider } from 'antd'

import GoogleSignIn from '../../../components/Auth/GoogleSignIn';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css'
import * as actions from '../../../store/actions/index';
import classes from '../Auth.module.css'

class SignUp extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const authData = {
          user: {
            email: values.email,
            username: values.userName,
            password: values.password,
            password_confirmation: values.password
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
    return (
      <Form onSubmit={this.handleSubmit} className={classes.Auth}>
        <GoogleSignIn responseGoogle={this.responseGoogle} text="Sign up with Google"/>
        <Divider>or</Divider>
        <FormItem hasFeedback={true}>
            {getFieldDecorator('email', {
              rules: [{ required: true, pattern: /.+?@.+?\..+?/, message: 'Your email is invalid' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
            )}
        </FormItem>
        <FormItem hasFeedback={true} >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem hasFeedback={true}>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 8, whitespace: true }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )
            }
        </FormItem>
        {/* Remove password confirmation for better sign up flow... */}
        {/* <FormItem hasFeedback={true}>
            {getFieldDecorator('passwordConfirmation', {
              rules: [{ required: true, min: 8, whitespace: true }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password confirmation" />
              )
            }
        </FormItem> */}
        <Button type="primary" htmlType="submit" className={classes.AuthButton} loading={this.props.loading} disabled={this.props.loading}>
          Sign Up
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
    onSignUp: (authData) => dispatch( actions.auth(authData, 'signUp') ),
    onHanleGoogleAuth: (accessToken) => dispatch( actions.hanleGoogleAuth(accessToken) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SignUp))