import { connect } from 'react-redux';
import HistoryBetModalLayout from 'components/modals/HistoryBetModal/HistoryBetModalLayout';
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        historyBets: state.betReducer.historyBetStore.map(bet => (
            compileBetContent(bet, getTranslate(state.localize)))),
    };
}

const compileBetContent = (bet, translate) => {
    return {
      draw: bet.detail.categoryName + " - " + translate("Bet " + bet.action) + ": " + bet.ratio,
      content: typeof bet.detail.type !== "undefined" ? "Type: " + bet.detail.type: "",
      id: bet.id,
      value: bet.value,
      winBet: bet.winBet,
      gameEnd: bet.gameEnd,
      guess: bet.guess,
      last: bet.last,
      result: translate(bet.result + " Win")
    }
  }

const HistoryBetModal = connect(
    mapStateToProps
)(HistoryBetModalLayout);

export default HistoryBetModal;
export { mapStateToProps }
