import React from 'react';
import Button from 'components/common/Button';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class BetItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      currentTime: new Date(),
      randomVal: 0
    };
  }

  componentDidMount() {
    this.state.timer = setInterval(
      function () {
        this.setState({
          currentTime: new Date(),
          randomVal: this.state.randomVal + Utils.getRandomValue(-0.0001, 0.0001)
        });
      }.bind(this), 1000);

  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return <div></div>;
  };

  renderOddBtn(ratio, color, odd, info, isDisabled) {
    if (typeof ratio !== "undefined") {
      return <div className={isDisabled ? 'disabled-bet-button' : ''}>
        <Button
          ratio={ratio}
          color={color}
          odd={odd}
          betClick={
            () => { this.props.betClick(ratio, odd, info); $('#myPlaceBetModal').modal('show'); }} />
      </div>
    }
    else {
      return <div></div>;
    }
  }

  renderTotal(total) {
    total = (typeof total === "undefined") ? 0 : total;
    return <div className="totalUp">
              <Translate id="Total: ${value}" data={{ value: Number(total).toFixed(2) }}/>
            </div>;
  }

  renderUserBetUp(betUpVal) {
    return this.renderUserBet(betUpVal);
  }

  renderUserBetDown(betUnderVal) {
    return this.renderUserBet(betUnderVal);
  }

  renderUserBet(betVal) {
    betVal = (typeof betVal !== "undefined") ? betVal : 0;
    return (
      <Translate id="Your bet: ${value}" data={{ value: betVal }}/>
    )
  }

  renderTimeEnd(timeEnd) {

    const timeEndDate = new Date(0);
    timeEndDate.setUTCSeconds(parseInt(timeEnd));

    const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
    return (
      <div className="count-down-time">
          {Utils.convertTimeToTz(timeEnd)}
        </div>
    );
  }

  renderTimeCountDown(timeEnd, gameStart) {

    if (typeof this.state.currentTime === "undefined"
        || (typeof gameStart !== "undefined"
        && gameStart*1000 > this.state.currentTime) ) {
      return <div className="count-down-time">
        <i className="fa fa-clock-o fa-lg" /> <Translate id="Waiting" />
      </div>;
    }

    const timeEndDate = new Date(0);
    timeEndDate.setUTCSeconds(parseInt(timeEnd));

    return (
      <div className="count-down-time">
        <i className="fa fa-clock-o fa-lg" /> {Utils.daysBetween(this.state.currentTime, timeEndDate)}
      </div>);
  }


  renderCurrentGuess(value, isButtonDisabled) {
    if (typeof value !== "undefined") {
      if(isButtonDisabled)
        return <div className="disabled-bet-button">{value}</div>
      return <div className="flickering">{value}</div>
    }
    else {
      return <div></div>;
    }
  }

  renderResult(isDisabled, info) {
    if (info.status === "done") {
      if (parseFloat(info.current) <= parseFloat(info.guess))
        return (
          <div className="lower-win">
            <label>
              <Translate
                id="Lower Win: ${value}"
                data={{ value: info.current }}/>
            </label>
            {this.renderRefund(info)}
          </div>
        )
      else
        return (
          <div className="higher-win">
            <label>
              <Translate
                id="Higher Win: ${value}"
                data={{ value: info.current }}/>
            </label>
            {this.renderRefund(info)}
          </div>
        )
    }
    return '';
  }

  renderRefund(info) {
    const { totalUp, totalUnder } = info
    const refund = Math.abs(totalUp - totalUnder);

    if (isNaN(refund) || (totalUp === 0 && totalUnder === 0)) {
      return (
        <div>
          <Translate id="Total refund: ${value}" data={{ value: 0 }}/>
        </div>
      )
    }
    return (
      <div>
        <Translate
          id="Total refund: ${value}"
          data={{ value: `${refund} (${(refund * 100 / Math.max(totalUp, totalUnder)).toFixed(2)}%)`}}/>
      </div>
    )
  }

  getUserBet(info, userBetList) {
    const userBetCategory = userBetList[info.id];
    if (typeof userBetCategory !== "undefined") {
      const userBet = userBetCategory[info.duration];
      if (typeof userBet !== "undefined") {
        return userBet;
      }
    }
    return 0;
  }

  isTimeToDisableButton(bet) {
    const date = new Date();
    let currentTime = date.getTime();
    let timePassed = currentTime / 1000 - bet.gameStart;
    if (timePassed >= bet.timeWait || timePassed < 0 || bet.status === "done") {
      return true
    }
    else {
      return false
    }
  }

  renderBtnContent(data, betType) {
    if (typeof data !== "undefined" && data !== "")
      return data
    return betType
  } Ï

  shouldComponentUpdate(nextProps, nextState) {
    const { info, userBetList } = this.props;
    if(nextProps.info.id !== info.id)
      return true;

    if (info.status === "done")
      return false;

    if (JSON.stringify(nextProps.info) !== JSON.stringify(info)
        || JSON.stringify(nextProps.userBetList) !== JSON.stringify(userBetList))
      return true;

    const {currentTime, randomVal} = this.state;
    if (nextState.currentTime !== currentTime
        || nextState.randomVal !== randomVal)
      return true;

    return false;
  }

  isTimeToWait(info) {
    const date = new Date();
    let currentTime = date.getTime();
    let timePassed = parseInt(currentTime / 1000) - info.gameStart;
    if (timePassed > info.timeWait && timePassed <= info.duration ) {
      return true
    }
    else {
      return false
    }
  }
}
export default BetItem;
