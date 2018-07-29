import React,{Component} from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';

import * as actions from '../../../../store/actions/index'

class BoardName extends Component {
  componentWillMount() {
    this.timer = 0;
  }

  // update board state. Only state not on api side!!
  handleBoardNameChage = (event) => {
    // Set the time 0 again!!
    clearTimeout(this.timer);

    // update the state
    const newBoard = {...this.props.board, "name": event.target.value}
    this.props.onSetBoard(newBoard)

    // If user don't time 3 seconds, update api side too.
    // REF: https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
    this.timer = setTimeout(() => {
      this.props.onUpdateBoard(newBoard)
        .then(result => message.success('Your board is updatad!'))
        .catch(err => message.error("Failed to update board..."))
      }, 3000);
  }
  
  render() {
    return (
      <input type="text" value={this.props.board.name} onChange={this.handleBoardNameChage} />
    );
  }
}

const mapStateToProps = state => {
  return {
      board: state.boards.board,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetBoard: (board) => dispatch( actions.setBoard(board) ),
    onUpdateBoard: (board) => dispatch( actions.updateBoard(board) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardName);