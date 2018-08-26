import React,{Component} from 'react'

import Aux from '../../../hoc/Aux/Aux'
import BoardName from './BoardName/BoardName'
import CardsTree from './CardsTree/CardsTree'

class Board extends Component {
  render() {
    return (
      <Aux>
        <BoardName 
          board_id={this.props.match.params.id}
          />
        <CardsTree 
          board_id={this.props.match.params.id}
          />
      </Aux>
    );
  }
}

export default Board;