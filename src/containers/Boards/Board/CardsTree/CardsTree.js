import React,{Component} from 'react'
import SortableTree, { addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import axios from '../../../../utilities';

// NOTE: I created some actions and reducer for this component first,
// but since we are not going to expect to use cardsTree state except this component,
// so I decided to use local state instead...
class CardsTree extends Component {
  state = {
    cardsTree: []
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

  render () {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
            treeData={this.state.cardsTree}
            onChange={treeData => this.handleCardsTreeChange(treeData)}
            onMoveNode={treeData => this.handleCardsTreeMove(treeData)}
          />
      </div>
    )
  }
}

export default CardsTree