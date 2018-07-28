import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Aux from '../../../hoc/Aux/Aux'
import CardsTree from './CardsTree/CardsTree'

class Board extends Component {
  render() {
    return (
      <Aux>
        <div>
          <input type="text" value={this.props.board.name} onChange={this.handleChange} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);