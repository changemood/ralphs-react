import React,{Component} from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';

import * as actions from '../../../store/actions/index'
import Aux from '../../../hoc/Aux/Aux'
import CardsTree from './CardsTree/CardsTree'

class Board extends Component {
  // update board state. Only state not on api side!!
  handleBoardNameChage = (event) => {
    const newBoard = {...this.props.board,
                      "name": event.target.value}
    this.props.onSetBoard(newBoard)
  }
  
  render() {
    return (
      <Aux>
        <div>
          <input type="text" value={this.props.board.name} onChange={this.handleBoardNameChage} />
        </div>
        <CardsTree 
          board_id={this.props.match.params.id}
          />
      </Aux>
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
    onSetBoard: (data) => dispatch( actions.setBoard(data) ),
    onUpdateBoard: (data) => dispatch( actions.updateBoard(data) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);