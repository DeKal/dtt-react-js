import { connect } from 'react-redux';
import ErrorModalLayout from 'components/modals/ErrorModal/ErrorModalLayout';


const mapStateToProps = (state, ownProps) => {
    return {
      errorMsg: state.betReducer.errorMsg,
    };
}

const ErrorModal = connect(
    mapStateToProps
)(ErrorModalLayout);

export default ErrorModal;
