import React,{Component} from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';

import * as actions from '../../../../store/actions/index'
import classes from './BoardName.module.css'

class BoardName extends Component {
  componentWillMount() {
    this.timer = 0;
  }

  // NOTE: This is a bit ugly...we should really fetch board
  componentDidMount() {
    if (!this.props.board) {
      this.props.onfetchBoard(this.props.board_id)
    }
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
    if (this.props.board) {
      return (
        <input className={classes.BoardName} 
              type="text" 
              value={this.props.board.name}
              placeholder='Board name'
              onChange={this.handleBoardNameChage} />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
      board: state.boards.board,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchBoard: (board_id) => dispatch (actions.fetchBoard(board_id)),
    onSetBoard: (board) => dispatch( actions.setBoard(board) ),
    onUpdateBoard: (board) => dispatch( actions.updateBoard(board) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardName);