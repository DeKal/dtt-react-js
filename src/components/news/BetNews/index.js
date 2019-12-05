import React from "react";
import Table from 'components/common/Table';
import BetItem from 'components/common/BetItem';
import BetDescription from 'components/common/BetDescription';
import Question from 'components/common/Question';
import { Utils } from 'utils';
import ApiService from 'service/ApiService';
import { Translate } from "react-localize-redux";

class BetNews extends BetItem {
  constructor(props) {
    super(props);
  }

  renderRow(time, betNo, result, betYes) {
    const row = {
      'Current': time,
      'Bet No': betNo,
      'Guess': result,
      'Bet Yes': betYes,
    };
    return row;
  }


  render() {
    const firstBetOfNews = this.props.info[0];
    return <div>
      <div key={firstBetOfNews.type} >
        <div className="news-bet">
          <div className="row">
            <div className="col-xl-6">
              <BetDescription
                bet_title={firstBetOfNews['betTitle']}
                bet_desc={firstBetOfNews['betDesc']}
                image_url={firstBetOfNews['betImage']}
                bet_author={firstBetOfNews['betAuthor']}
                link_url={`/detail/news/${firstBetOfNews['categoryId']}/${firstBetOfNews['id']}/${firstBetOfNews['type']}`}
              />
              <Question question={firstBetOfNews['betQuestion']} />
            </div>
            <div className="col-xl-6">
              <Table headers={HEADERS} rows={this.renderRows(firstBetOfNews)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  renderRows(info) {
    const isButtonDisabled = this.isTimeToDisableButton(info)
    let rows = [];
    rows.push(this.renderRow(
      this.renderTimeCountDown(info['gameStart'] + info['timeWait'], info['gameStart']),
      this.renderUserBetDown(this.getUserBet(info, this.props.userBetList).bet_down),
      this.renderTimeEnd(info['timeEnd']),
      this.renderUserBetUp(this.getUserBet(info, this.props.userBetList).bet_up),
    ));
    rows.push(this.renderRow(
      '',
      this.renderOddBtn('No - Yes', 'red-button', this.renderBtnContent(info['downText'], 'No'), info, isButtonDisabled),
      '',
      this.renderOddBtn('Yes - No', 'green-button', this.renderBtnContent(info['upText'], 'Yes'), info, isButtonDisabled),
    ));

    rows.push(this.renderRow(
      '',
      this.renderTotal(info['totalUnder']),
      this.renderResult(isButtonDisabled, info),
      this.renderTotal(info['totalUp']),
    ));

    return rows;
  }

  getUserBet(info, userBetList) {
    const userBetCategory = userBetList[info.id];
    if (typeof userBetCategory !== "undefined") {
      const userBet = userBetCategory[info.type];
      if (typeof userBet !== "undefined") {
        return userBet;
      }
    }
    return 0;
  }

  renderGuess() {
    if (this.props.info['categoryId'] === 2) { //sport
      return (
        <div>MU:CE / ?.?</div>
      )
    } else {
      return (
        <div className="flickering">
          <span>No?</span>
          /
          <span>Yes?</span>
        </div>
      )
    }
  }

  renderResult(isDisabled, info) {
    if (info.status === "done") {
      if (parseFloat(info.current) < parseFloat(info.guess))
        return (
          <div className="lower-win">
            <div>
              <Translate id="No Win"/>
            </div>
            {this.renderRefund(info)}
          </div>
        )
      else
        return (
          <div className="higher-win">
            <div>
              <Translate id="Yes Win"/>
            </div>
            {this.renderRefund(info)}
          </div>
        )
    }
    return '';
  }

}

const HEADERS = ['Current', 'Bet No', 'Guess', 'Bet Yes'];
export default BetNews;
