import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Input, Icon, message } from 'antd'

import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css'
import * as actions from '../../store/actions/index';
import classes from '../../containers/Auth/Auth.module.css'

class User extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          user: {
            email: values.email,
            username: values.userName,
          }
        }
        this.props.onUpdate(data)
        .then(result => message.success('Your profile is updatad!'))
        .catch(err => message.error("Failed to update profile..."))
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    return (
      <Form onSubmit={this.handleSubmit} className={classes.Auth}>
        <FormItem hasFeedback={true}>
            {getFieldDecorator('email', {
              rules: [{ required: true, pattern: /.+?@.+?\..+?/, message: 'Your email is invalid' }],
              initialValue: this.props.user.email
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
            )}
        </FormItem>
        <FormItem hasFeedback={true} >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username' }],
              initialValue: this.props.user.username
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={classes.AuthButton} loading={this.props.loading} disabled={this.props.loading}>
          Save
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: (data) => dispatch( actions.updateUser(data) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(User))