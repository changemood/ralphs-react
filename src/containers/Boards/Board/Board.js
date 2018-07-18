import React,{Component} from 'react'

import Aux from '../../../hoc/Aux/Aux'
import CardsTree from './CardsTree/CardsTree'

class Board extends Component {
  render() {
    return (
      <Aux>
        <div>Board title</div>
        <CardsTree 
          board_id={this.props.match.params.id}
          />
      </Aux>
    );
  }
}

export default Board;