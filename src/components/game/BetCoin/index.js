import React from 'react';
import BetGame from 'components/game/BetGame';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class BetCoin extends BetGame {

  componentDidMount() {
    this.state.timer = setInterval(
      function () {
        this.setState({
          currentTime: new Date(),
          randomVal: Utils.getRandomInt(0, 1)

        });
      }.bind(this), 1000);

  }

  renderLeftOddBtn(isButtonDisabled) {
    return this.renderOddBtn(
      'Lower',
      'red-button',
      'Bet Images',
      '/assets/images/coin_head.png', isButtonDisabled);
  }

  renderRightOddBtn(isButtonDisabled) {
    return this.renderOddBtn(
      'Higher',
      'green-button',
      'Bet Numbers',
      '/assets/images/coin_tail.png', isButtonDisabled);
  }

  renderOddBtn(ratio, color, odd, imageUrl, isButtonDisabled) {
    if (typeof ratio !== "undefined") {
      return <img className={`${isButtonDisabled ? "disabled-bet-images" : ""}`}
        src={imageUrl}
        style={{ width: "70px" }}
        onClick={() => {
          this.props.betClick(ratio, odd, this.props.info); $('#myPlaceBetModal').modal('show');
        }} />
    }
    else {
      return <div></div>;
    }
  }

  getHeader() {
    return HEADER_COIN;
  }

  renderGuess(info) {
    if(info.status === "done") {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="flickering">?</div>
      )
    }
  }

  renderRow(current, betUp, guess, betDown) {
    const row = {
      [HEADER_COIN[0]]: current,
      [HEADER_COIN[1]]: betUp,
      [HEADER_COIN[2]]: guess,
      [HEADER_COIN[3]]: betDown
    };
    return row;
  }

  renderResult(isDisabled, info) {
    if (info.status === "done") {
      return (
        <div >
          <label>
            <img src={(parseFloat(info.current) < parseFloat(info.guess)) ? "/assets/images/coin_head.png" : "/assets/images/coin_tail.png"}
              style={{ width: "70px" }}></img>
          </label>
          <label className={(parseFloat(info.current) < parseFloat(info.guess)) ? "lower-win" : "higher-win"}>
            <Translate id="Win"/>
            {this.renderRefund(info)}
          </label>
        </div>
      )
    }
    return '';
  }

}

export default BetCoin;

const HEADER_COIN = ['Current', 'Bet Images', 'Guess', 'Bet Numbers']
