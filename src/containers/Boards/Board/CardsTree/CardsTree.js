import React,{Component} from 'react'
import SortableTree, { addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index'
import axios from '../../../../utilities';
import CardForm from '../../../../components/Modal/CardForm/CardForm'
import { message } from 'antd';

// NOTE: I created some actions and reducer for this component first,
// but since we are not going to expect to use cardsTree state except this component,
// so I decided to use local state instead...
class CardsTree extends Component {
  state = {
    cardsTree: [],
    modalVisible: false,
    node: {},
    path: []
  }
  
  componentDidMount () {
    this.fetchCardsTree()
  }

  fetchCardsTree () {
    const id = "8984903c-709b-4a6d-8d4a-0286247ad324"
    axios.get(`/v1/boards/${id}/cards/tree.json`)
      .then(response => {
        this.setState({cardsTree: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Update card ancestry on api side.
  handleCardsTreeMove (treeData) {
    const data = {parent_id: (treeData.nextParentNode ? treeData.nextParentNode.id : null)}
    axios.patch(`v1/cards/${treeData.node.id}/update_ancestry`, data)
      .catch(err => {
        console.log(err)
      })
  }

  // Simply update state.
  handleCardsTreeChange (treeData) {
    this.setState({cardsTree: treeData})
  }

  submitCardForm = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      const data = {
        card: {
          title: values.title,
          body: values.body,
          parent_id: this.state.node.id
        }
      }
      this.props.onCreateCard(data)
        .then(result => {
          message.success('Card is successfully created');
          form.resetFields();
          this.closeModal();

          // Update cardsTree state!! only if card is successfully created
          const getNodeKey = ({ treeIndex }) => treeIndex;
          this.setState(state => ({
              cardsTree: addNodeUnderParent({
                treeData: this.state.cardsTree,
                parentKey: this.state.path[this.state.path.length - 1],
                expandParent: true,
                getNodeKey: getNodeKey,
                newNode: {
                  title: this.props.card.title,
                  subtitle: this.props.card.body
                },
              }).treeData,
            }))
        })
        .catch(err => {
          message.error('Failed to create card, try again...');
        })
    });
  }

  openModal = (node, path) => {
    this.setState({modalVisible: true, node: node, path: path})
  }

  closeModal = () => {
    this.setState({modalVisible: false})
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render () {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
            treeData={this.state.cardsTree}
            onChange={treeData => this.handleCardsTreeChange(treeData)}
            onMoveNode={treeData => this.handleCardsTreeMove(treeData)}
            generateNodeProps={({ node, path }) => ({
              buttons: [
                <button
                  onClick={() => { this.openModal(node, path);}}
                >
                  Add Child
                </button>]}
                )}
          />
        <CardForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.modalVisible}
            close={this.closeModal}
            loading={this.props.loading}
            submitCardForm={this.submitCardForm}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.manageCard.loading,
      card: state.manageCard.card,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateCard: (data) => dispatch( actions.createCard(data) )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(CardsTree)