import React,{Component} from 'react'

import classes from './ReviewCards.module.css'
import Card from '../../../components/Dashboard/ReviewCards/Card/Card'

class ReviewCards extends Component {
  
  handleReviewed = (cardId, type = 'reviewed') => {
    if (type === 'reviewed') {
      console.log('reviewd')
    } else {
      console.log('again')
    }
  }

  render() {  
    return (
      <div className={classes.ReviewCards}>
        <Card
          reviewed={() => this.handleReviewed('123')}
          reviewAgain={() => this.handleReviewed('123', 'again')}
          />
      </div>
    )
  }
}



export default ReviewCards;