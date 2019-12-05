import React from 'react';
import { connect } from 'react-redux';
import { fetchHomeData  } from 'redux/actions/FetchHomeData';
import BetTimer from 'components/timers/BetTimer';

class HomeBetTimerLayout extends BetTimer {

  updateBets() {
    this.props.fetchHomeData(this.props.categories);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHomeData: (categories) => dispatch(fetchHomeData(categories))
  }
};

const HomeBetTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBetTimerLayout);

export default HomeBetTimer;
