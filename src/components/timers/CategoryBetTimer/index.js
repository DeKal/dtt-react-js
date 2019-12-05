import React from 'react';
import { connect } from 'react-redux';
import { fetchBetByCategoryId } from 'redux/actions/FetchBetByCategoryId';
import BetTimer from 'components/timers/BetTimer';

class CategoryBetTimerLayout extends BetTimer {

  updateBets() {
    const { categoryId } = this.props;
    this.props.fetchBetByCategoryId(categoryId);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBetByCategoryId: (categoryId) => dispatch(fetchBetByCategoryId(categoryId))
  }
};

const CategoryBetTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryBetTimerLayout);

export default CategoryBetTimer;
