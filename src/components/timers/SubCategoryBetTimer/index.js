import React from 'react';
import { connect } from 'react-redux';
import { fetchBetBySubCategoryId } from 'redux/actions/FetchBetBySubCategoryId';
import BetTimer from 'components/timers/BetTimer';

class SubCategoryBetTimerLayout extends BetTimer {

  updateBets() {
    const { categoryId, subCategoryId } = this.props;
    this.props.fetchBetBySubCategoryId(categoryId, subCategoryId);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBetBySubCategoryId: (categoryId, subCategoryId) => dispatch(fetchBetBySubCategoryId(categoryId, subCategoryId))
  }
};

const SubCategoryBetTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategoryBetTimerLayout);

export { SubCategoryBetTimerLayout };
export default SubCategoryBetTimer;
