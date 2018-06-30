import React,{Component} from 'react'
import { connect } from 'react-redux';
import { Spin } from 'antd'

import 'react-sortable-tree/style.css';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';

import * as actions from '../../../../store/actions/index'

class CardsTree extends Component {
  componentDidMount () {
    this.props.onFetchCardsTree("board_id")
  }

  handleCardsTreeMove (treeData) {
    console.log("MOVE")
    // parent
    console.log(treeData.nextParentNode.id)
    // children
    console.log(treeData.node.id)
  }

  handleCardsTreeChange (treeData) {
    this.setState({treeData})
    console.log("CHANGE")
    console.log(treeData)
  }

  render () {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
            treeData={this.props.cardsTree}
            onChange={treeData => this.props.onUpdateCardsTreeState(treeData)}
            onMoveNode={treeData => this.handleCardsTreeMove(treeData)}
          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.cardsTree.loading,
      cardsTree: state.cardsTree.cardsTree
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCardsTree: (id) => dispatch( actions.fetchCardsTree(id) ),
    onUpdateCardsTreeState: (newCardsTree) => dispatch( actions.updateCardsTreeState(newCardsTree) ),
    onUpdateCardParent: (id, parentId) => dispatch( actions.updateCardParent(id, parentId) )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsTree);