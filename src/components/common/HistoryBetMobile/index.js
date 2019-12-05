import HistoryBetMobileLayout from './HistoryBetMobileLayout'
import { connect } from 'react-redux';
import { mapStateToProps } from 'components/modals/HistoryBetModal'

const HistoryBetMobile = connect(
    mapStateToProps
)(HistoryBetMobileLayout);

export default HistoryBetMobile;

