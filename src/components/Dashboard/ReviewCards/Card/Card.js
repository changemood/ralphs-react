import React from 'react'
import { Link } from 'react-router-dom'
import {Icon, Menu, Dropdown} from 'antd'

import classes from './Card.module.css'

const card = (props) => {
  const onClick = function ({ key }) {
    if (key === "2" ) {
      console.log('Open edit card')
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">
        <Link to={`/boards/${props.board_id}`} >Go to board</Link>
      </Menu.Item>
      <Menu.Item key="2">Edit</Menu.Item>
    </Menu>
  );

  return (
    <div className={classes.Card}>
      <div className={classes.Main}>
        <div className={classes.Title}>
          {props.title}
        </div>
        <div className={classes.Body}>
          {props.body}
        </div>
      </div>
      <div className={classes.Menu}>
        <div className={[classes.Button, classes.Up].join(' ')} onClick={props.up}>
          <Icon type="like-o" style={{fontSize: 25 }}/>
        </div>
        <div className={[classes.Button, classes.Down].join(' ')} onClick={props.down}>
          <Icon type="dislike-o" style={{fontSize: 25 }}/>
        </div>
        <div className={classes.DropDown}>
          <Dropdown overlay={menu} placement="bottomCenter">
              <Icon type="ellipsis" style={{fontSize: 25 }}/>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default card;