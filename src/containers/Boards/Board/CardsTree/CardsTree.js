import React,{Component} from 'react'
import SortableTree, { addNodeUnderParent, removeNodeAtPath, toggleExpandedForAll } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index'
import axios from '../../../../utilities';
import CardForm from '../../../../components/Modal/CardForm/CardForm'
import { message, Button } from 'antd';

// NOTE: I created some actions and reducer for this component first,
// but since we are not going to expect to use cardsTree state except this component,
// so I decided to use local state instead...
class CardsTree extends Component {
  state = {
    cardsTree: [],
    modalVisible: false,
    node: {},
    path: [],
    searchString: '',
    searchFocusIndex: 0,
    searchFoundCount: null,
  }
  
  componentDidMount () {
    this.fetchCardsTree()
  }

  fetchCardsTree () {
    axios.get(`/v1/boards/${this.props.board_id}/cards/tree.json`)
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
          board_id: this.props.board_id,
          parent_id: (this.state.node ? this.state.node.id : null) // this.state.node is null when create parent card
        }
      }
      this.props.onCreateCard(data)
        .then(result => {
          message.success('Card is successfully created');
          form.resetFields();
          this.closeModal();

          // Update cardsTree state!! only if card is successfully created
          // first condition is to add child. second one is to create parent card
          const getNodeKey = ({ treeIndex }) => treeIndex;
          let newCardTree = null
          const newCard = {
            title: this.props.card.title,
            subtitle: this.props.card.body
          }
          if (this.state.node && this.state.path) {
            newCardTree = addNodeUnderParent({
            treeData: this.state.cardsTree,
            parentKey: this.state.path[this.state.path.length - 1],
            expandParent: true,
            getNodeKey: getNodeKey,
            newNode: newCard}).treeData
          } else {
            newCardTree = this.state.cardsTree.concat(newCard)
          }
          this.setState(state => ({
            cardsTree: newCardTree,
          }))
        })
        .catch(err => {
          message.error('Failed to create card, try again...');
        })
    });
  }

  // IF they want to add parent card,
  // node and path are null.
  openModal = (node=null, path=null) => {
    this.setState({modalVisible: true, node: node, path: path})
  }

  closeModal = () => {
    this.setState({modalVisible: false})
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  toggleExpanded = (expanded) => {
    this.setState({cardsTree: toggleExpandedForAll({treeData: this.state.cardsTree, expanded: expanded})})
  }

  render () {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

    // Case insensitive search of `node.title` and `subtitle`
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      (node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 || node.subtitle.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    return (
      <div style={{ height: 600 }}>
        <div>
          <Button
            type="primary"
            onClick={() => { this.openModal();}}
          >
            Add parent
          </Button>
          <Button
            type="primary"
            onClick={() => this.toggleExpanded(true)}
            >
            Expand All
          </Button>
          <Button
            type="primary"
            onClick={() => this.toggleExpanded(false)}
            >
            Collapse All
          </Button>
        </div>
        <div>
          <form
            style={{ display: 'inline-block' }}
            onSubmit={event => {
              event.preventDefault();
            }}>
            <input
              type="text"
              placeholder="Search..."
              style={{ fontSize: '1rem' }}
              value={searchString}
              onChange={event => this.setState({ searchString: event.target.value })}
            />
            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            >
              &lt;
            </button>
            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            >
              &gt;
            </button>
            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        </div>
        <SortableTree
          treeData={this.state.cardsTree}
          onChange={treeData => this.handleCardsTreeChange(treeData)}
          onMoveNode={treeData => this.handleCardsTreeMove(treeData)}
          searchMethod={customSearchMethod}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          // rowHeight={100}
          //
          // This callback returns the matches from the search,
          // including their `node`s, `treeIndex`es, and `path`s
          // Here I just use it to note how many matches were found. (https://codesandbox.io/s/koz6mk94yv)
          searchFinishCallback={matches =>
            this.setState({
              searchFoundCount: matches.length,
              searchFocusIndex:
                matches.length > 0 ? searchFocusIndex % matches.length : 0,
            })
          }

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