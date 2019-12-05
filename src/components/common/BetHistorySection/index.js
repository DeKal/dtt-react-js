
import React from 'react';
import HistoryTable from 'components/common/HistoryTable';
import HistoryPieChart from 'components/charts/HistoryPieChart';
import { Utils } from 'utils';

class BetHistorySection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentBet, totalUp, totalUnder} = this.props.bet;
    const {headers} = this.props;
    return (

      <section className="bet-history">
        <div className="row">
          <div className="col-md-6">
            <div className="history-alarm"><i className="fa fa-clock-o fa-lg" /> </div>
            <HistoryTable headers={headers} rows={this.getRowData(currentBet, headers)} sumYes={totalUp} sumNo={totalUnder}/>
          </div>
          <div className="col-md-6">
            <HistoryPieChart sumYes={totalUp} sumNo={totalUnder} labels={[headers[1], headers[2]]}/>
          </div>
        </div>
      </section>
    );
  }
  getRowData(currentBet, headers) {
    const rows = Array();
    if (currentBet.constructor !== Array) return rows;

    currentBet.forEach( (s, key) => {
      if (key < 10) {
        rows.push({
          [headers[0]]: Utils.formatDateFromTime(Number(s.game_start)),
          [headers[1]]: s.bet_down,
          [headers[2]]:  s.bet_up
        });
      }
    })
    return rows;
  }
}
export default BetHistorySection;
