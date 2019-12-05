import { connect } from 'react-redux';
import DesktopSideBarLayout from './DesktopSideBarLayout';
import {clearSid} from 'redux/actions/ClearSid/index.js';

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.fetchCategory.data,
    categoryToParentMap: state.fetchCategory.mapToParent,
    authenKey: state.login.authenKey
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSid: () => dispatch(clearSid())
  }
};

const DesktopSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopSideBarLayout);

export default DesktopSideBar;
