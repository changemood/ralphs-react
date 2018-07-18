import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd';

class CardForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const FormItem = Form.Item
    return (
      <Modal title="Create New Card"
        visible={this.props.visible}
        onOk={this.props.submitCardForm}
        okText="Create"
        confirmLoading={this.props.loading}
        onCancel={this.props.close}
      >
        <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of Card!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Body">
              {getFieldDecorator('body')(<Input.TextArea rows={10} />)}
            </FormItem>
          </Form>
      </Modal>
    );
  }
}

export default Form.create()(CardForm)