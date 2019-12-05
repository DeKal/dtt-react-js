import React from 'react';
import { connect } from 'react-redux';
import { fetchBetByCategory } from 'redux/actions/FetchBetByCategory';
import BetTimer from 'components/timers/BetTimer';

class CategoryTypeBetTimerLayout extends BetTimer {

  updateBets() {
    this.props.fetchBetByCategory(this.props.categories)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBetByCategory: (categories) => dispatch(fetchBetByCategory(categories))
  }
};

const CategoryTypeBetTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTypeBetTimerLayout);

export default CategoryTypeBetTimer;
