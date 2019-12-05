import React from 'react';
import Table from 'components/common/Table';
import BetItem from 'components/common/BetItem';
import { BET_TYPE } from 'consts/';
import uuid from 'uuid';
import ApiService from 'service/ApiService';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class BetMarket extends BetItem {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      collapse: false,
      selectedTime: this.props.info[0].duration,
      selectedTimeCategory: this.props.info,
    };
  }

  renderRow(current, betUp, guess, betDown) {
    const row = {
      'Current': current,
      'Bet Lower': betUp,
      'Guess': guess,
      'Bet Higher': betDown
    };
    return row;
  }

  render() {
    let selectedTimeCategory = this.props.info.filter(timeCategory => timeCategory.duration === this.state.selectedTime);
    if (selectedTimeCategory.length === 0) {
      selectedTimeCategory = this.props.info;
    }
    const selectedTimeData = selectedTimeCategory[0].bet;
    return (

      <div className="market-bet">
        {this.renderTimeCategoryButtons(this.props.info)}
        <BetMarketContent
          selectedTimeData={selectedTimeData}
          renderBetRows={this.renderBetRows.bind(this)}
        />
      </div>
    );
  };

  renderBetRows(info) {
    const isButtonDisabled = this.isTimeToDisableButton(info)
    const rows = [];
    let countDown;
    if(isButtonDisabled)
      countDown = this.renderTimeCountDown(info['gameStart'] + info['timeResult'], isButtonDisabled)
    else
      countDown = this.renderTimeCountDown(info['gameStart'] + info['timeWait'], isButtonDisabled)

    rows.push(this.renderRow(
      countDown,
      this.renderUserBetUp(this.getUserBet(info, this.props.userBetList).bet_down),
      this.renderTimeEnd(info['timeEnd']),
      this.renderUserBetDown(this.getUserBet(info, this.props.userBetList).bet_up)
    ));

    rows.push(this.renderRow(
      this.renderCurrentGuess(info['current'], isButtonDisabled),
      this.renderOddBtn('Lower - Higher', 'red-button', this.renderBtnContent(info['downText'], 'Lower'), info, isButtonDisabled),
      this.renderCurrentGuess(info['guess'], true),
      this.renderOddBtn('Higher - Lower', 'green-button', this.renderBtnContent(info['upText'], 'Higher'), info, isButtonDisabled)
    ));

    rows.push(this.renderRow(
      '',
      this.renderTotal(info['totalUnder']),
      this.renderResult(isButtonDisabled, info),
      this.renderTotal(info['totalUp'])
    ));
    return rows;
  }

  renderTimeCountDown(timeEnd, isButtonDisabled) {
    const timeEndDate = new Date(0);
    timeEndDate.setUTCSeconds(parseInt(timeEnd));
    let status = isButtonDisabled ? "Waiting Result" : "Betting"

    return (
      <div className="count-down-time">
        <i className="fa fa-clock-o fa-lg" /> {Utils.daysBetween(this.state.currentTime, timeEndDate)}
        <br/>(<Translate id={status} />)
      </div>);
  }

  renderTimeCategoryButtons(buttons_list) {
    return (
      <div className="bet-time">
        {
          buttons_list.map(time => {
            return <a key={uuid.v4()}
              className={`bet-time-item ${time.duration === this.state.selectedTime ? "flickering" : ""}`}
              onClick={() => {
                this.setState({
                  selectedTime: time.duration
                });
              }}>
              {time.type}
            </a>
          })}
      </div>
    );
  }
}

export default BetMarket;

class BetMarketContent extends React.Component {
    render() {
        return (
            <Table headers={HEADERS} rows={this.props.renderBetRows(this.props.selectedTimeData)} />
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
      const {selectedTimeData} = this.props;
      if (selectedTimeData.status === "done")
        return false;
      return true;
    }
}

const HEADERS = ['Current', 'Bet Lower', 'Guess', 'Bet Higher'];
