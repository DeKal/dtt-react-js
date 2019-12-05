import React from 'react';
import BetSingle from 'components/popups/BetSingle';
import { Translate } from "react-localize-redux";

class OpenBet extends React.Component {
    render() {
        const { singles, bets_info } = this.props.bets
        return (
            <div className="bet-slip">
                <div className="bets-list">
                    <div className="singles">
                      <Translate id="Singles (${singles} Selection)" data={{singles: singles}}/>
                    </div>
                    <ul className="list-unstyled">
                         <li>
                            <BetSingle
                              bets={bets_info}
                              removeBet={() => ({})}
                              disabled={true}
                            />
                          </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default OpenBet;
