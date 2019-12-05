import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BetSlip from 'components/popups/BetSlip';
import OpenBet from 'components/popups/OpenBet';
import { removeBet } from 'redux/actions/RemoveBet';
import { placeBet } from 'redux/actions/PlaceBet';
import { updateBet } from 'redux/actions/UpdateBet';
import { listHistoryBetClick } from 'redux/actions/ListHistoryBetClick';
import { fetchOpenBet } from 'redux/actions/FetchOpenBet'
import { fetchUserInfo } from 'redux/actions/FetchUserInfo'
import { fetchBetBySubCategoryId } from 'redux/actions/FetchBetBySubCategoryId'
import { ActionTypes } from 'redux/actions/ActionTypes';
import { Translate } from "react-localize-redux";

class BetPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.authenKey) {
        this.props.fetchOpenBet(this.props.authenKey);
      }
    }, 5000);
  }

  renderBetPopup() {
    let openBet = {
      singles: this.props.placed_bets.length,
      bets_info: this.props.placed_bets
    }
    return (
      <div id="open-bet-tab">
        <div className="tab-header"><Translate id="Open Bet"/></div>
        <div><OpenBet bets={openBet} /></div>
      </div>
    );
  };
}

export default BetPopup;

const compileBetContent = (bet) => {
  return {
    draw: bet.detail.categoryName + " - " + bet.action + ": " + bet.ratio,
    content: typeof bet.detail.type !== "undefined" ? "Type: " + bet.detail.type : "",
    id: bet.id,
    value: bet.value,
    status: bet.status,
    subcategoryId: bet.detail.id,
    categoryId: bet.detail.categoryId
  }
}

export const mapStateToProps = state => {
  return {
    authenKey: state.login.authenKey,
    bets: state.betReducer.betStore.map(bet => (
      compileBetContent(bet)
    )),
    placed_bets: state.betReducer.placedBetStore.map(bet => (
      compileBetContent(bet)
    )),
    listHistoryBetClick: state.listHistoryBetClick.tabSelected
  }
};

export const mapDispatchToProps = dispatch => {
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
