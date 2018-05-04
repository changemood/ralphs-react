import React, {Component} from 'react'
import { Layout, Menu, Icon, message } from 'antd';
import { NavLink } from 'react-router-dom';

import classes from './AfterAuth.module.css'
import CardForm from '../../../components/Modal/CardForm/CardForm'
import {axios} from '../../../utilities';

const { Sider, Content } = Layout;

class AfterAuth extends Component {
  state = {
    collapsed: false,
    modalVisible: false,
    loading: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleMenuClick = ({ key }) => {
    if (key === "1" ) {
      this.setState({modalVisible: true})
    } else if ( key === "2" ) {
      console.log('Open board page')
    }
  }

  closeModal = () => {
    this.setState({modalVisible: false})
  }

  submitCardForm = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        loading: true,
      });
      const params = {
        card: {
          title: values.title,
          body: values.body,
          // TODO: let user choose board if they want to...?
          // board_id: null
        },
      }
      axios.post('/api/v1/cards.json', params)
      .then(response => {
        message.success('Card is successfully created');
        form.resetFields();
        this.setState({
          modalVisible: false,
          loading: false,
        });
      })
      .catch(err => {
        message.error('Failed to create card, try again...');
        this.setState({
          loading: false,
        });
      })
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ overflow: 'auto', height: '100vh', left: 0 }}
        >
          <div className={classes.Logo} />
          <Menu theme="dark" mode="inline" onClick={this.handleMenuClick}>
            <Menu.Item key="1" >
              <Icon type="plus-circle-o" />
              <span>Create Card</span>
            </Menu.Item>
            <Menu.Item key="2" >
              <NavLink to="/boards" exact>
                <Icon type="laptop" />
                <span>Boards</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <header className={classes.Header}>
            <div className={classes.Left}>
              <Icon
                className={classes.HeaderIcon}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </div>
            <div className={classes.Right}>
              <NavLink to="/user" exact>
                <Icon className={classes.HeaderIcon}
                      type="user"
                />
              </NavLink>
            </div>
          </header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <CardForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.modalVisible}
              close={this.closeModal}
              loading={this.state.loading}
              submitCardForm={this.submitCardForm}/>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AfterAuth;