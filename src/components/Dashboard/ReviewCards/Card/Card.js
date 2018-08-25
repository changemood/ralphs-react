import React from 'react'
import {Icon, Menu, Dropdown} from 'antd'

import classes from './Card.module.css'

const card = (props) => {
  const onClick = function ({ key }) {
    if (key === "1" ) {
      console.log('Link to Board')
    } else if ( key === "2" ) {
      console.log('Stop review')
    } else if ( key === "3") {
      console.log('Open edit card')
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Go to board</Menu.Item>
      <Menu.Item key="2">Stop Review</Menu.Item>
      <Menu.Item key="3">Edit</Menu.Item>
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
        <div className={classes.Button} onClick={props.up}>
          <Icon type="like-o" style={{fontSize: 25 }}/>
        </div>
        <div className={classes.Button} onClick={props.down}>
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