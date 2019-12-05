import React from 'react';
import BetHistorySingle from 'components/common/BetHistorySingle';
import { Translate } from "react-localize-redux";

class HistoryBetMobileLayout extends React.Component {
    render() {
        const { historyBets } = this.props;
        return (
            <div className="history-bet-mobile">
                <div className="bet-slip">
                    <div className="bets-list">
                        {
                            historyBets.length !== 0 ?
                                <BetHistorySingle bets={historyBets} />
                                : <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    <Translate id="Bet Not Found"/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoryBetMobileLayout;
