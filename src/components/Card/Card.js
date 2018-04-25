import React from 'react'
import {Icon} from 'antd'

import classes from './Card.module.css'

const card = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Main}>
        <div className={classes.Title}>
          <p>Title</p>
          {/* {props.title} */}
        </div>
        <div className={classes.Body}>
          {/* {props.body} */}
        </div>
      </div>
      <div className={classes.Menu}>
        <div className={classes.Button}>
          <Icon type="like-o" style={{fontSize: 25 }}/>
        </div>
        <div className={classes.Button}>
          <Icon type="dislike-o" style={{fontSize: 25 }}/>
        </div>
        <div className={classes.DropDown}>
          <Icon type="ellipsis" style={{fontSize: 25 }}/>
        </div>
      </div>
    </div>
  )
}

export default card;