import React,{Component} from 'react'
import { connect } from 'react-redux';
import { Spin } from 'antd'

import * as actions from '../../../store/actions/index'
import classes from './ReviewCards.module.css'
import Card from '../../../components/Dashboard/ReviewCards/Card/Card'

class ReviewCards extends Component {

  componentDidMount () {
    this.props.onFetchReviewCards()
  }

  render() {
    let reviewCards = <div style={{textAlign: "center"}}><Spin tip='Loading'/></div>
    if ( !this.props.loading ) {
      reviewCards = this.props.reviewCards.map( card => {
        return (
          <li key={card.id}>
            <Card
              title={card.title}
              body={card.body}
              up={() => this.props.onReviewCard(card.id, 'up')}
              down={() => this.props.onReviewCard(card.id, 'down')}
              />
          </li> 
        )
      })  
    }
    return (
      <div className={classes.ReviewCards}>
        <ul>
          {reviewCards}
        </ul>
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
    onFetchReviewCards: () => dispatch( actions.fetchReviewCards() ),
    onReviewCard: (id,type) => dispatch( actions.reviewCard(id, type) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCards);