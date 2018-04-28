import React,{Component} from 'react'
import { connect } from 'react-redux';
import { Spin } from 'antd'

import * as actions from '../../../store/actions/index'
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

  componentDidMount () {
    this.props.onFetchReviewCards()
  }

  render() {
    let reviewCards = <Spin tip='Loading'/>
    if ( !this.props.loading ) {
      reviewCards = this.props.reviewCards.map( card => {
        return (
          <Card
            key={card.id}
            title={card.title}
            body={card.body}
            reviewed={() => this.handleReviewed('123')}
            reviewAgain={() => this.handleReviewed('123', 'again')}
            />
        )
      })  
    }
    return (
      <div className={classes.ReviewCards}>
        {reviewCards}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.reviewCards.loading,
      reviewCards: state.reviewCards.reviewCards
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchReviewCards: () => dispatch( actions.fetchReviewCards() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCards);