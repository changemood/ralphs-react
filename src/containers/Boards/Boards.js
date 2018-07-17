import React,{Component} from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
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
      <div>
        {boards}
      </div>
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