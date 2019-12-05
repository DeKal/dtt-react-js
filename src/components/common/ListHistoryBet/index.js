import { connect } from 'react-redux';
import ListHistoryBetLayout from 'components/common/ListHistoryBet/ListHistoryBetLayout';
import { fetchHistoryBet } from 'redux/actions/FetchHistoryBet';

const mapStateToProps = (state) => {
    return {
        authenKey: state.login.authenKey
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchHistoryBet: (authenKey) => dispatch(fetchHistoryBet(authenKey))
    };
}

const ListHistoryBet = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListHistoryBetLayout);

export default ListHistoryBet;
