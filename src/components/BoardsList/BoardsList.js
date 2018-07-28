import React from 'react'
import { List, Spin } from 'antd'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';

import './BoardsList.css'
// you wish to use this boardsList component to the page other than "/boards" page and don't need to load more?
// Just pass hasMore false. You still need to pass props.loadMore
const boardsList = (props) => {
  return (
    <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={props.handleInfiniteOnLoad}
          hasMore={!props.loading && props.hasMore}
          useWindow={false}
        >
          <List
            dataSource={props.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<Link to={`/boards/${item.id}`} onClick={() => props.setBoard(item)}>{item.name}</Link>}
                />
                <div>Some button will be here...</div>
              </List.Item>
            )}
          >
            {props.loading && props.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
  )
}

export default boardsList;