import React,{Component} from 'react'
import 'react-sortable-tree/style.css';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';

class CardsTree extends Component {
  state = {
    treeData: [
      {
        id: "asdkj==asdfkjklasdf",
        title: "roots",
        subtitle: "root body",
        children: [
          {
            "title": "descendant",
            "subtitle": "yay",
            "children": []
          },
          {
            "title": "descendant",
            "subtitle": "yay",
            "children": [
              {
              "title": "descendant",
              "subtitle": "yay",
              "children": []
              }
            ]
          }
        ]
      }
    ]
  }  
  render () {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            onMoveNode={treeData => console.log(treeData.nextParentNode)}
          />
      </div>
    )
  }
}

export default CardsTree;