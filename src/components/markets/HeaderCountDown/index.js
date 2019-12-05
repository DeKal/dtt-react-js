import React from 'react';
import { USER_BET } from "consts/";
import { Translate } from "react-localize-redux";

class HeaderCountDown extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const { bet, isDisableBet, countDown} = this.props;
    return (
      <div>
        {this.renderCountDown(bet, isDisableBet, countDown)}
        <div className="row user-bet user-bet-header">
          <div className="col-6">
            {this.renderBetValue(0, bet.current)}
          </div>
          <div className="col-6">
          {this.renderBetValue(1, bet.guess)}
          </div>
        </div>
      </div>
    )
  }

  renderCountDown(bet, isDisableBet, countDown) {
    return (
      <div className="user-bet-header section-sub-header row">
        <div className="col-6">
          {countDown}
        </div>
        <div className="col-6">
          <strong> {this.renderResult(isDisableBet, bet)} </strong>
        </div>
      </div>
    )
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
          </div>
        )
    }
    return '';
  }

  renderBetValue(type, value) {
    switch (type) {
      case USER_BET.CURRENT:
        return (
          <div className="user-bet-header">
              <Translate id="Current"/>
              {": "}
              <span className="flickering">{value}</span>
          </div>
        )
      case USER_BET.GUESS:
        return (
          <div className="user-bet-header">
              <Translate id="Guess"/>
              {": "}
              <span className="flickering">{value}</span>
          </div>
        )
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
          </div>
        )
    }
    return '';
  }

  shouldComponentUpdate(nextProps, nextState) {
      const  { bet } = this.props;
      if (bet.status === "done")
        return false;

      return true ;
    }
}

export default HeaderCountDown;
