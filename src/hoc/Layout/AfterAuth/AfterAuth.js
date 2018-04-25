import React, {Component} from 'react'
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import classes from './AfterAuth.module.css'

const { Sider, Content } = Layout;

class AfterAuth extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleMenuClick = () => {

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="2" >
              <NavLink to="/bords" exact>
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
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AfterAuth;