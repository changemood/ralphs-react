import React,{Component} from 'react'

import ReviewCards from './ReviewCards/ReviewCards'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <h3>- Time to Review -</h3>
        <ReviewCards />
      </div>
    )
  }
}

export default Dashboard;