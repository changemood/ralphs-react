import React,{Component} from 'react'
import { Divider } from 'antd'

import ReviewCards from './ReviewCards/ReviewCards'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Divider orientation="left">Time to Review</Divider>
        <ReviewCards />
      </div>
    )
  }
}

export default Dashboard;