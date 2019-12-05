import React from 'react';
import { connect } from 'react-redux';
import SwipeableTemporaryDrawerLayout from './SwipeableTemporaryDrawerLayout';
import {clearSid} from 'redux/actions/ClearSid/index.js';

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.fetchCategory.extractedMenu,
    categoryToParentMap: state.fetchCategory.mapToParent,
    authenKey: state.login.authenKey
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSid: () => dispatch(clearSid())
  }
};

const SwipeableTemporaryDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeableTemporaryDrawerLayout);

export default SwipeableTemporaryDrawer;
