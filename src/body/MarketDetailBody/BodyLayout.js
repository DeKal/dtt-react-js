
import React from 'react';

import BetHistoryTable from 'components/markets/BetHistoryTable';
import UserBetMobile from 'components/markets/UserBetMobile';
import UserBetDesktop from 'components/markets/UserBetDesktop';
import BetHistorySection from 'components/common/BetHistorySection'
import SubCategoryBetTimer from 'components/timers/SubCategoryBetTimer';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";
import HeaderCountDown from 'components/markets/HeaderCountDown';

class BodyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      currentTime: new Date()
    };
  }

  componentDidMount() {
    const { categoryId, id } = this.props.params;
    this.props.fetchPageDetail(categoryId, id);
    this.state.timer = setInterval(
      function () {
        this.setState({
          currentTime: new Date()
        });
      }.bind(this), 1000);
  }

  render() {
    if (this.props.data.length == 0) {
      return <div></div>;
    }
    const { categoryId, id } = this.props.params;
    const bet = this.refineByTime(this.props.data[0], this.props.params.type.replace("-", "/"));
    const isDisableBet = this.isTimeToDisableButton(this.state.currentTime, bet);
    let countDown;
    if(isDisableBet)
      countDown = this.renderTimeCountDown(bet['gameStart'] + bet['timeResult'], isDisableBet)
    else
      countDown = this.renderTimeCountDown(bet['gameStart'] + bet['timeWait'], isDisableBet)
    return (
      <div className="container">
        <SubCategoryBetTimer betMap={this.props.data} categoryId={categoryId} subCategoryId={id}/>
        {this.renderTitle(bet)}
        <section>
          {this.renderBetHistory(bet)}

          <div className="header-count-down">
            <HeaderCountDown bet={bet} isDisableBet={isDisableBet} countDown={countDown}/>
          </div>

          <div className="user-bet-mobile">
            <UserBetMobile bet={bet} isDisableBet={isDisableBet} />
          </div>

          <div className="row user-bet-desktop">
            <div className="col-sm-6">
              <UserBetDesktop type={0} bet={bet} isDisableBet={isDisableBet} />
            </div>
            <div className="col-sm-6">
              <UserBetDesktop type={1} bet={bet} isDisableBet={isDisableBet} />
            </div>
          </div>
        </section>
        <section>
          <div className="section-header">
            <Translate id="Bet history in one section"/>
          </div>
          <BetHistorySection bet={bet} headers={HEADERS}/>
        </section>
      </div>
    );
  }


  refineByTime(betsList, type) {
    let result = betsList.filter(bet => bet.type === type);
    if (result.length === 1) {
      return result[0];
    } else if (result.length > 1) {
      console.log("More than 1 bet have the same type: " + type);
      return result[0];
    }
    console.log("Empty bet");
  }

  renderTitle(bet) {
    return (
      <div className="detail-header">
        <div style={{ display: "inline-flex" }}>
          {bet.categoryName}
        </div>
        <div style={{ display: "inline-flex", float: "right" }}>
          <Translate id={"Type: ${type}"} data={{type: bet.type}}/>
        </div>
      </div>
    )
  }

  renderTimeCountDown(timeEnd, isDisableBet, gameStart) {

    if (typeof this.state.currentTime === "undefined"
        || (typeof gameStart !== "undefined"
        && gameStart*1000 > this.state.currentTime) ) {
      return <div className="count-down-time">
        <i className="fa fa-clock-o fa-lg" /> <Translate id="Waiting" />
      </div>;
    }

    const timeEndDate = new Date(0);
    timeEndDate.setUTCSeconds(parseInt(timeEnd));
    let status = isDisableBet ? "Waiting Result" : "Betting"

    return (
      <div className="count-down-time">
        <i className="fa fa-clock-o fa-lg" /> {Utils.daysBetween(this.state.currentTime, timeEndDate)}
        <br/>(<Translate id={status} />)
      </div>);
  }

  isTimeToDisableButton(date, bet) {
    let currentTime = date.getTime();
    let timePassed = currentTime / 1000 - bet.gameStart;
    if (timePassed >= bet.timeWait || timePassed < 0 || bet.status === "done") {
      return true
    }
    else {
      return false
    }
  }

  renderBetHistory(bet) {
    if (bet.historyBet.constructor !== Array || bet.historyBet.length === 0)
      return <div></div>

    return <div>
      <div className="section-header">
        <Translate id="Bet History"/>
      </div>
      <div className="bet-history-table">
        <BetHistoryTable histories={bet.historyBet} />
      </div>
    </div>
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

}

const HEADERS = ["Time", "Bet Lower", "Bet Higher"];

export default BodyLayout;
