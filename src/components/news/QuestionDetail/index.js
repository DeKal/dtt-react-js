import { connect } from 'react-redux';
import { recordBet } from 'redux/actions/RecordBet';
import QuestionDetailLayout from './QuestionDetailLayout';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    userBetList: state.betReducer.userBet
  }
};

const mapDispatchToProps = dispatch => {
  return {
    betClick: (ratio, odd, bet) => dispatch(recordBet(ratio, odd, bet))
  };
};

const QuestionDetail = connect(
  mapStateToProps, mapDispatchToProps
)(QuestionDetailLayout);

export default QuestionDetail;
