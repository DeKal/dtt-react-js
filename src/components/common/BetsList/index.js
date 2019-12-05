import React from 'react';
import { connect } from 'react-redux';
import BetMarket from 'components/markets/BetMarket';
import BetMarketByTime from 'components/markets/BetMarketByTime';
import BetNews from 'components/news/BetNews';
import { recordBet } from 'redux/actions/RecordBet';
import { BET_TYPE } from "consts/";
import renderGame from 'components/game/GameManagement';

class BetsListLayout extends React.Component  {

  render() {
    const { bets, type, subCategoryId, betClick, userBetList } = this.props;
    switch (type.toLowerCase()) {
      case BET_TYPE.MARKET:
          if (typeof subCategoryId !== "undefined") {
            return <BetMarketByTime userBetList={userBetList}
                                    info={bets}
                                    key={bets.id}
                                    betClick={betClick} />
          }
          else {
            return <BetMarket userBetList={userBetList}
                              info={this.convertToTimeCategory(bets)}
                              key={bets.id}
                              betClick={betClick} />;
          }
      case BET_TYPE.SPORTS:
      case BET_TYPE.NEWS:
        return <BetNews userBetList={userBetList}
                        info={bets}
                        key={bets.id}
                        betClick={betClick}/>;
      case BET_TYPE.GAMES:
        return bets.map(bet => {
          return renderGame(bet, betClick, userBetList);
        });
      default:
        console.log("Unsupported type" + type);
    }
  }
  convertToTimeCategory (bets) {
    const timeCategory = [];
    bets.forEach(bet => {
      timeCategory.push(
        {
          type: bet.type,
          duration: +bet.duration,
          bet: bet
        }
      );
    });
    return timeCategory;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { bets, type, subCategoryId, userBetList } = this.props;
    if (JSON.stringify(nextProps.bets) !== JSON.stringify(bets)
        || nextProps.type !== type
        || nextProps.subCategoryId !== subCategoryId
        || JSON.stringify(nextProps.userBetList) !== JSON.stringify(userBetList))
      return true;
    return false;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userBetList: state.betReducer.userBet
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    betClick: (ratio, odd, bet) => dispatch(recordBet(ratio, odd, bet))
  }
};

const BetsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetsListLayout);

export default BetsList;
