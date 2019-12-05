import React from 'react';
import Table from 'components/common/Table';
import BetItem from 'components/common/BetItem';
import BetTimer from 'components/timers/BetTimer';
import { Translate } from "react-localize-redux";
class BetGame extends BetItem {


    renderOddBtn(ratio, color, odd) {
        return <div></div>;
    }

    renderRow(current, betUp, guess, betDown) {
        return {};
    }


    render() {
        return (
            <div className="market-bet">
                <Table headers={this.getHeader()} rows={this.renderAllRow()} />
            </div>
        );
    };

    getHeader() {
        return [];
    }

    renderAllRow() {
        const rows = [];
        const { info } = this.props;
        const isButtonDisabled = this.isTimeToDisableButton(info)

        rows.push(this.renderRow(
            this.renderTimeCountDown(info['gameStart'] + info['timeWait']),
            this.renderUserBetUp(this.getUserBet(info, this.props.userBetList).bet_down),
            this.renderTimeEnd(info['timeEnd']),
            this.renderUserBetDown(this.getUserBet(info, this.props.userBetList).bet_up)
        ));
        rows.push(this.renderRow(
            '',
            this.renderLeftOddBtn(isButtonDisabled),
            this.renderGuess(info),
            this.renderRightOddBtn(isButtonDisabled)
        ));

        rows.push(this.renderRow(
            '',
            this.renderTotal(info['totalUnder']),
            this.renderResult(isButtonDisabled, info),
            this.renderTotal(info['totalUp'])
        ));
        return rows;
    }

    renderGuess(info) {
      return <div className="flickering">{info["guess"]}</div>
    }

    renderLeftOddBtn(isButtonDisabled) {
        return <div></div>
    }

    renderRightOddBtn(isButtonDisabled) {
        return <div></div>
    }

    renderResult(isDisabled, info) {
        if (info.status === "done") {
            if (parseFloat(info.current) <= parseFloat(info.guess))
                return (
                    <div className="lower-win">
                        <Translate
                          id="Lower Win: ${value}"
                          data={{ value: parseInt(info.current) }}/>
                        {this.renderRefund(info)}
                    </div>
                )
            else
                return (
                    <div className="higher-win">
                        <Translate
                          id="Higher Win: ${value}"
                          data={{ value: parseInt(info.current) }}/>
                        {this.renderRefund(info)}
                    </div>
                )
        }
        return '';
    }

}

export default BetGame;
