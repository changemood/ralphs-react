import React,{Component} from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'

import classes from './Boards.module.css'
import * as actions from '../../store/actions/index'
import Aux from '../../hoc/Aux/Aux'
import BoardsList from '../../components/BoardsList/BoardsList'

class Boards extends Component {
  componentDidMount() {
    this.props.onFetchBoards()
  }

  // TODO: Consider if we need infinite load...
  // Should we just have paging instead...?
  handleInfiniteOnLoad = () => {
    // https://ant.design/components/list/
  }

  render() {
    let boards = <Spin tip='Loading'/>
    if ( !this.props.loading ) {
      boards = (
        <BoardsList
          handleInfiniteOnLoad={this.handleInfiniteOnLoad}
          loading={this.props.loading}
          hasMore={false}
          data={this.props.boards}
          />
      )
    }

    return (
      <Aux>
        <div class={classes.SearchContainer}>
          <p>search form will be here!!</p>
        </div>
        <div class={classes.BoardsContainer}>
          {boards}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Boards);