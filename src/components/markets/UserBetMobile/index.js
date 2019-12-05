import React from 'react';
import { recordBet } from 'redux/actions/RecordBet';
import UserBet from 'components/markets/UserBet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class UserBetMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      randomVal: 0,
      0: {
        "betAmount": 50,
        "totalBetting": 0
      },
      1: {
        "betAmount": 50,
        "totalBetting": 0
      }
    }

    this.saveStateToParent = this.saveStateToParent.bind(this)
  }

  componentDidMount() {
    // this.state.timer = setInterval(function() {
    //   this.setState({
    //     randomVal: this.state.randomVal + Utils.getRandomValue(-0.5, 0.5)
    //   });
    // }.bind(this), 1000);
  }

  saveStateToParent(type, betAmount, totalBetting) {
    this.setState({
      [type]: {
        "betAmount": betAmount,
        "totalBetting": totalBetting
      }
    });
  }
  render() {
    return (
      <div className="user-bet">
        <Tabs>
          <TabList>
            <Tab><Translate id="Bet Lower" /></Tab>
            <Tab><Translate id="Bet Higher" /></Tab>
          </TabList>

          <TabPanel>
            <UserBet
              type={0}
              betAmount={this.state['0'].betAmount}
              totalBetting={this.state['0'].totalBetting}
              callback={this.saveStateToParent}
              bet={this.props.bet}
              isDisableBet={this.props.isDisableBet}
            />
          </TabPanel>
          <TabPanel>
            <UserBet
              type={1}
              betAmount={this.state['1'].betAmount}
              totalBetting={this.state['1'].totalBetting}
              callback={this.saveStateToParent}
              bet={this.props.bet}
              isDisableBet={this.props.isDisableBet}
            />
          </TabPanel>
        </Tabs>
      </div>)
  }

  renderBetHeader = () => {
    const { current, guess } = this.props.bet;
    return (<div className="user-bet-header">
      <div className="list-unstyled">
        <li className="list-inline-item">
          <Translate id="Current" />
          {": "}
          <span className="flickering">{current}</span>
        </li>
        <li className="list-inline-item">
          <Translate id="Guess" />
          {": "}
          <span className="flickering">{guess}</span>
        </li>
      </div>
    </div>)
  }
}

export default UserBetMobile;
