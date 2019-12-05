import React from 'react';

class BetSingle extends React.Component {

  render() {
    return (
      this.props.bets.map((bet, i) => {
        const { draw, content, value, status, action, odd, gameStart, guess, type} = bet;
        return (
          <div className="bet-single" key={i}>
            <div className="bet-result">{draw}</div>
            <div className="bet-content">
              {this.renderAction(action, odd)}
              {this.renderGuess(guess, type)}
            </div>

            <div className="bet-content">
              <div>
                {content}
              </div>
              <div className="bet-time">
                {gameStart}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <input
                type="number"
                className="bet-amount"
                value={value}
                placeholder="0"
                disabled={this.props.disabled}
                onChange={(e) => { this.handleChange(e.target.value, bet) }}
                required={true} />
              {(status !== "undefined") ?
                <label className="flickering">
                  {status}
                </label> : ""
              }
            </div>
          </div>
        )
      }));
  }

  renderGuess(guess, type) {
    if (typeof guess !== "undefined" && type ==="market")
      return (
        <div className="bet-time flickering">Guess: {guess}</div>
      )
    else
      return <div></div>;
  }

  renderAction(action, odd) {
    if (typeof action !== "undefined") {
      if (action === "Yes" || action == "Higher") {
        return <div className="bet-ratio" style={{ color: "green" }}>{action} = {odd}</div>
      } else {
        return <div className="bet-ratio" style={{ color: "red" }}>{action} = {odd}</div>
      }
    } else
      return <div></div>;
  }

  handleChange(val, bet) {
    bet.value = val;
    this.props.updateBet(bet);
  }

}


export default BetSingle;
