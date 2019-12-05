import React from 'react';
import Table from 'components/common/Table';
import BetMarket from 'components/markets/BetMarket';
import { withRouter } from 'react-router-dom';

class BetMarketByTime extends BetMarket {
  constructor(props) {
    super(props);
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
    return <div>
      {
        this.props.info.map((betByTime) => {
          return (
            <div key={betByTime.type} >
              <div className="market-bet">
                {this.renderTimeCategoryButtons(betByTime)}
                <BetMarketByTimeContent
                  betByTime={betByTime}
                  renderBetRows={this.renderBetRows.bind(this)}
                />
              </div>
            </div>
          );
        })
      }
    </div>
  };

  renderTimeCategoryButtons(betByTime) {
    const { categoryId, id, type } = betByTime;
    return (
      <div className="bet-time">
        <a key={type}
          className="bet-time-item isSelected flickering"
          onClick={() => {
            const path_to_detail = `/detail/market/${categoryId}/${id}/${type.replace("/", "-")}`;
            this.props.history.push(path_to_detail);
          }}>
          {type}
        </a>
      </div>
    );
  }
}

export default withRouter(BetMarketByTime);

class BetMarketByTimeContent extends React.Component {
  render() {
    return (
      <Table headers={HEADERS} rows={this.props.renderBetRows(this.props.betByTime)} />
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { betByTime } = this.props;
    if (betByTime.status === "done")
      return false;
    return true;
  }
}

const HEADERS = ['Current', 'Bet Lower', 'Guess', 'Bet Higher'];
