import React from 'react';
import { USER_BET } from "consts/";
import { connect } from 'react-redux';
import { recordBet } from 'redux/actions/RecordBet';
import UserBet from 'components/markets/UserBet';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class UserBetDesktop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      randomVal: 0
    };
  }

  componentDidMount() {
    this.state.timer = setInterval(function () {
      this.setState({
        randomVal: this.state.randomVal + Utils.getRandomValue(-0.1, 0.1)
      });
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const { type, bet, isDisableBet } = this.props;
    return (<div className="user-bet">
      {this.renderBetHeader()}
      <UserBet type={type} bet={bet} isDisableBet={isDisableBet} />
    </div>)
  }

  renderBetHeader = () => {
    const { type } = this.props;
    switch (type) {
      case USER_BET.CURRENT:
        return (
          <div className="user-bet-header">
              <b>
                <Translate id="Bet Lower"/>
                {" "}
                <i className="far fa-angle-up bet-arrow-up" />
              </b>
          </div>
        )
      case USER_BET.GUESS:
        return (
          <div className="user-bet-header">
            <b>
                <Translate id="Bet Higher"/>
                {" "}
                <i className="far fa-angle-down bet-arrow-down" />
            </b>
          </div>
        )
    }
  }

}

export default UserBetDesktop;
