import React from 'react';
import { USER_BET } from "consts/";
import { connect } from 'react-redux';
import { recordBet } from 'redux/actions/RecordBet';
import { Translate } from "react-localize-redux";

class UserBetLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBettingData: {
        betAmount: props.betAmount ? props.betAmount : 50,
        add: [100, 150, 200, 300],
        totalBetting: props.totalBetting ? props.totalBetting : 0
      }
    }
    this.editBetAmount = this.editBetAmount.bind(this);
  }

  componentWillUnmount() {
    if (typeof this.props.callback === 'undefined') {
      return;
    }
    this.props.callback(this.props.type, this.state.userBettingData.betAmount, this.state.userBettingData.totalBetting)
  }

  render() {
    return (
      <div className="user-bet">
        {this.renderBetBody()}
      </div>
    )
  }

  renderBetBody = () => {
    if (typeof this.props.bet === "undefined") return "";
    const { bet, type, isDisableBet } = this.props;
    const { oddUp, oddDown } = bet;
    return (
      <div className="user-bet-body">
        <div className="bet-amount">
          {this.renderBetArea()}
          {this.renderOdd(bet, type)}
        </div>
        {this.renderAddBettingArea()}
        {this.renderBettingControl(bet, type, isDisableBet)}
      </div>
    )
  }

  renderBetArea = () => {
    return (
      <div>
        <span>
          <Translate id="Add:"/>
          <input type="number"
                 value={this.state.userBettingData.betAmount}
                 onChange={this.editBetAmount} />
          <i
            className="fa-lg fa-plus"
            style={{ fontStyle: "normal", cursor: "pointer"}}
            onClick={()=> {this.addBet(this.state.userBettingData.betAmount)}}>
            </i>
        </span>
      </div>
    )
  }

  renderOdd = (bet, type) => {
    const odd = (type === 0 ) ? bet.oddUp : bet.oddUnder;
    return (
      <div style={{textAlign: "right"}}>
        <b>
            <Translate id={"Odd ${oddValue}"} data={{oddValue: odd}} />
        </b>
      </div>
    )
  }

  renderAddBettingArea = () => {
    return (
      <div className="add-betting">
        <span>
          <Translate id="Click to add: "/>
        </span>
        {
            this.state.userBettingData.add.map((element, i) => (
                <li key={i}
                    className="list-inline-item"
                    onClick={() => {this.addBet(element)}}>
                  +{element}
                </li>
            ))
        }
      </div>
    )
  }

  renderBettingControl = (bet, type, isDisabled) => {
      return (
          <div className={"total-betting font-weight-bold " + (isDisabled ? 'disabled-bet-button' : '')}>
              <div>
                <Translate
                    id={"Total for betting: ${value}"}
                    data={{value: this.state.userBettingData.totalBetting}}/>
              </div>
              <button type="button"
                      className="btn btn-secondary betting-button "
                      onClick={() => {
                        const newBet = {
                          ...bet,
                          value: this.state.userBettingData.totalBetting
                        }
                        if (type === 1 )
                          this.props.recordBet(bet.oddUp, "Higher", newBet)
                        else{
                          this.props.recordBet(bet.oddUnder, "Lower", newBet)
                        }
                        $('#myPlaceBetModal').modal('show');
                      }}>
                      <Translate id="Betting"/>
              </button>
              <button type="button"
                      className="btn btn-secondary cancel-button"
                      onClick={()=> { this.cancelBet() }}>
                      <Translate id="Clear"/>
              </button>
          </div>
    )
  }

  editBetAmount = (event) => {
    this.setState({
      userBettingData: {
        ...this.state.userBettingData,
        "betAmount": event.target.value
      }
    });
  }

  addBet = (betAmount) => {
    const currentTotalBet = this.state.userBettingData.totalBetting;
    this.setState(
      {
        userBettingData: {
          ...this.state.userBettingData,
          totalBetting: currentTotalBet + parseInt(betAmount)
        }
      }
    )
  }

  cancelBet = () => {
    this.setState(
      {
        userBettingData: {
          ...this.state.userBettingData,
          totalBetting: 0
        }
      }
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}
const mapDispatchToProps = dispatch => {
  return {
    recordBet: (ratio, betContent, bet) => dispatch(recordBet(ratio, betContent, bet))
  }
}
const UserBet = connect(
  mapStateToProps, mapDispatchToProps
)(UserBetLayout)

export default UserBet;
