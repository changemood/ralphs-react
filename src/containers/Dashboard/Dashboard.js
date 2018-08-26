import React,{Component} from 'react'
import {Divider} from 'antd'
import ReviewCards from './ReviewCards/ReviewCards'
import classes from './Dashboard.module.css'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Divider orientation="left"><div className={classes.RowHeader}>Time to Review</div></Divider>
        <ReviewCards />
      </div>
    )
  }
}

export default Dashboard;