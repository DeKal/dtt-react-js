import { connect } from 'react-redux';
import PlaceBetModalLayout from 'components/modals/PlaceBetModal/PlaceBetModalLayout';
import { removeBet } from 'redux/actions/RemoveBet';
import { placeBet } from 'redux/actions/PlaceBet';
import { updateBet } from 'redux/actions/UpdateBet';
import { fetchOpenBet } from 'redux/actions/FetchOpenBet'
import { fetchUserInfo } from 'redux/actions/FetchUserInfo'
import { fetchBetBySubCategoryId } from 'redux/actions/FetchBetBySubCategoryId'
import { ActionTypes } from 'redux/actions/ActionTypes';
import { Utils } from "utils";

const compileBetContent = (bet) => {
    return {
        draw: bet.detail.categoryName,
        type: bet.detail.betType,
        ratio: bet.ratio,
        content: typeof bet.detail.type !== "undefined" ? "Type: " + bet.detail.type : "",
        id: bet.id,
        value: bet.value,
        winBet: bet.winBet,
        action: bet.action,
        guess: bet.detail.guess,
        gameStart: Utils.convertTimeToTz(bet.detail.gameStart),
        odd: (bet.action === "Lower" || bet.action === "No") ? bet.detail.oddUnder : bet.detail.oddUp
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        bets: state.betReducer.betStore.map(bet => (
            compileBetContent(bet)
        )),
        authenKey: state.login.authenKey,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOpenBet: (authenKey) => dispatch(fetchOpenBet(authenKey)),
        fetchUserInfo: (authenKey) => dispatch(fetchUserInfo(authenKey)),
        removeBet: (id) => dispatch(removeBet(id)),
        placeBet: (authenKey) => dispatch(placeBet(authenKey)),
        updateBet: (bet) => dispatch(updateBet(bet)),
        selectTab: (tabIndex) => dispatch(listHistoryBetClick(tabIndex)),
        fetchBetBySubCategoryId: (categoryId, subCategoryId) => dispatch(fetchBetBySubCategoryId(categoryId, subCategoryId, ActionTypes.UPDATE_BET_BY_SUB_CATEGORY))
    }
}

const PlaceBetModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaceBetModalLayout);

export default PlaceBetModal;
