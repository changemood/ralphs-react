import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Input, Icon } from 'antd'
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css'
import * as actions from '../../../store/actions/index';
import classes from '../Auth.module.css'

class SignUp extends Component {
  state = {
    email: '',
    userName: '',
    password: '',
    passwordConfirmation: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSignUp(values.email, values.userName, values.password, values.passwordConfirmation)
        console.log('Received values of form: ', values);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    return (
      <Form onSubmit={this.handleSubmit} className={classes.Auth}>
        <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )
            }
        </FormItem>
        <FormItem>
            {getFieldDecorator('passwordConfirmation', {
              rules: [{ required: true, message: 'Please input your Password confirmation' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password confirmation" />
              )
            }
        </FormItem>
        <Button type="primary" htmlType="submit" className={classes.AuthButton}>
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
    onSignUp: (email, userName, password, passwordConfirmation) => dispatch( actions.signUp(email, userName, password, passwordConfirmation) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SignUp))