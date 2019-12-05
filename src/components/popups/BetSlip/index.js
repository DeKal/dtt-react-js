import React from 'react';
import BetSingle from 'components/popups/BetSingle';

class BetSlip extends React.Component {
    render() {
        const { singles, bets_info } = this.props.bet;
        return (
            <div className="bet-slip">
                <div className="bets-list">
                    <div className="singles">Singles ({singles} Selection)</div>
                    <BetSingle bets={bets_info} updateBet={this.props.updateBet} removeBet={this.props.removeBet} />
                </div>
            </div>
        )
    }

    calcTotalMoney(bets) {
        let totalValue = 0;
        bets.map((bet, i) => {
            totalValue += Number(bet.value);
        });
        return totalValue;
    }
}

export default BetSlip;
