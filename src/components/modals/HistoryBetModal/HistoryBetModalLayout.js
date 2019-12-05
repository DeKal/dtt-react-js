import React from 'react';
import BetHistorySingle from 'components/common/BetHistorySingle';
import { Translate } from "react-localize-redux";

class HistoryBetModalLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { historyBets } = this.props;
    return (
      <div id="myHistoryBetModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#fef7e1" }}>
            <div className="modal-header">
              <h5 className="modal-title"><Translate id="History Bet" /></h5>
              <label className="close" data-dismiss="modal"><i className="far fa-times fa-2x"></i></label>
            </div>
            <div className="bet-slip">
              <div className="bets-list">
                {
                  historyBets.length !== 0 ? <BetHistorySingle bets={historyBets} />
                    : <div style={{ padding: "1rem" }}><Translate id="Bet Not Found" /></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryBetModalLayout;
