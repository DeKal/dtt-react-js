import React from 'react';
import Button from 'components/common/Button';
import BetGame from 'components/game/BetGame';
import { Utils } from 'utils';
class BetNumber extends BetGame {

    componentDidMount() {
        this.state.timer = setInterval(
            function () {
                this.setState({
                    currentTime: new Date(),
                    randomVal: Utils.getRandomInt(0, 100)
                });
            }.bind(this), 1000);
    }

    renderLeftOddBtn(isButtonDisabled) {
        return this.renderOddBtn('Lower', 'red-button', '0-50', isButtonDisabled);
    }

    renderRightOddBtn(isButtonDisabled) {
        return this.renderOddBtn('Higher', 'green-button', '51-100', isButtonDisabled);
    }

    renderOddBtn(ratio, color, odd, isButtonDisabled) {
        if (typeof ratio !== "undefined") {
            return <div className={isButtonDisabled ? 'disabled-bet-button' : ''}>
                <Button
                    ratio={ratio}
                    color={color}
                    odd={odd}
                    betClick={
                        () => { this.props.betClick(ratio, odd, this.props.info); $('#myPlaceBetModal').modal('show'); }} />
            </div>
        }
        else {
            return <div></div>;
        }
    }

    getHeader() {
        return HEADER_NUMBER;
    }

    renderRow(current, betUp, guess, betDown) {
        const row = {
            'Current': current,
            'Bet 0 - 50': betUp,
            'Guess': guess,
            'Bet 51 - 100': betDown
        };
        return row;
    }
}

export default BetNumber;

const HEADER_NUMBER = ['Current', 'Bet 0 - 50', 'Guess', 'Bet 51 - 100']
