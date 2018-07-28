import React, {Component} from 'react'
import { Layout, Menu, Icon, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'
import classes from './AfterAuth.module.css'
import CardForm from '../../../components/Modal/CardForm/CardForm'

const { Sider, Content } = Layout;

class AfterAuth extends Component {
  state = {
    collapsed: true,
    modalVisible: false,
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
      this.props.onCreateBoard({"board": {"name": ""}})
        .then(result => {
          this.props.history.push(`/boards/${this.props.board.id}`)
        })
        .catch(err => {
          message.error('Failed to create board, try again...');
        })
    } else if ( key === "3" ) {
      this.props.history.push(`/boards`)
    }
  }

  closeModal = () => {
    this.setState({modalVisible: false})
  }

  submitCardForm = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      const data = {
        card: {
          title: values.title,
          body: values.body,
        }
      }
      this.props.onCreateCard(data)
        .then(result => {
          message.success('Card is successfully created');
          form.resetFields();
          this.closeModal();
        })
        .catch(err => {
          message.error('Failed to create card, try again...');
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
              <Icon type="plus-square-o" />
              <span>Create Board</span>
            </Menu.Item>
            <Menu.Item key="3" >
              <Icon type="laptop" />
              <span>Boards</span>
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
              loading={this.props.loading}
              submitCardForm={this.submitCardForm}/>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.manageCard.loading,
      card: state.manageCard.card,
      board: state.boards.board,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateCard: (data) => dispatch( actions.createCard(data) ),
    onCreateBoard: (data) => dispatch( actions.createBoard(data) )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AfterAuth));