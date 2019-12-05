import React from 'react';
import { Translate } from "react-localize-redux";

class BetHistorySingle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          this.props.bets.map((bet, i) => {
            const { draw, content, value, winBet, gameEnd, guess, last, result } = bet;
            return (
              <div className="bet-single" key={i}>
                <div className="bet-result">{draw}</div>
                  {this.renderGuessLast(last, guess, result)}
                <div className="bet-content">
                  <div>
                    {content}
                  </div>
                  <div className="bet-time">
                    {gameEnd}
                  </div>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <input
                    type="number"
                    className="bet-amount"
                    value={value}
                    placeholder="0"
                    disabled={this.props.disabled}
                    onChange={(e) => { this.handleChange(e.target.value, bet) }}
                    required={true} />
                  <label style={winBet >= 0 ? {color: "green"} : {color: "red"}}>
                    {winBet}
                  </label>
                </div>
              </div>
            )
          }));
      }

      renderGuessLast(last, guess, result) {
        if(last != 0 && last != 1) {
          return (
            <div className="bet-content">
              <div className="flickering"><Translate id="Last"/>: {last}</div>
              <div className="flickering"><Translate id="Guess"/>: {guess}</div>
            </div>
          )
        } else {
          return (
            <div className="bet-content">
              <div className="flickering">{result}</div>
            </div>
        )
      }
    }
}

export default BetHistorySingle;
