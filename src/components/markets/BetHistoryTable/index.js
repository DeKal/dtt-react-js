import React from 'react';
import Table from 'components/common/Table';
import { Utils } from 'utils';

const HEADER = ["Round Bet", "Guess", "Bet Lower", "Bet Higher", "Result"]

class BetHistoryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table headers={HEADER} rows={this.renderRows()} />
    )
  }

  renderRows() {
    const rows = Array();
    this.props.histories.forEach((history, key) => {
      if (key < 10) {
        rows.push({
          [HEADER[0]]: Utils.formatDateFromTime(Number(history.game_start)),
          [HEADER[1]]: history.guess,
          [HEADER[2]]: history.total_bet_down,
          [HEADER[3]]: history.total_bet_up,
          [HEADER[4]]: history.last,
        });
      }
    });
    return rows;
  }
}

export default BetHistoryTable;
