import React,{Component} from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'

// import classes from './Boards.module.css'
import * as actions from '../../../store/actions/index'
import Aux from '../../../hoc/Aux/Aux'
// import BoardsList from '../../components/BoardsList/BoardsList'

class Board extends Component {
  render() {
    return (
      <Aux>
        <p>{this.props.match.params.id}</p>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.boards.loading,
    boards: state.boards.boards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoards: () => dispatch( actions.fetchBoards() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);