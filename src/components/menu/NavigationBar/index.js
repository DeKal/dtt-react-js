import { connect } from 'react-redux';
import { showLogin } from 'redux/actions/ShowLogin';
import { fetchUserInfo } from 'redux/actions/FetchUserInfo';
import { clearRecentBet } from 'redux/actions/ClearRecentBet';
import { fetchHistoryBet } from 'redux/actions/FetchHistoryBet';
import NavigationBarLayout from 'components/menu/NavigationBar/NavigationBarLayout';

const mapStateToProps = (state, ownProps) => {
    return {
        loginShow: state.login.showState,
        authenKey: state.login.authenKey,
        userInfo: state.login.userInfo,
        recentBet: state.betReducer.recentBet
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleLoginPopup: (loginShow) => dispatch(showLogin(loginShow)),
        fetchUserInfo: (authenKey) => dispatch(fetchUserInfo(authenKey)),
        fetchHistoryBet: (authenKey) => dispatch(fetchHistoryBet(authenKey)),
        clearRecentBet: () => dispatch(clearRecentBet())
    }
};

const NavigationBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarLayout);

export default NavigationBar;
