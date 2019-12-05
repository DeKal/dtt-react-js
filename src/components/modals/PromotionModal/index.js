import { connect } from 'react-redux';
import PromotionModalLayout from 'components/modals/PromotionModal/PromotionModalLayout';
import { fetchPromotion } from 'redux/actions/FetchPromotion';


const mapStateToProps = (state, ownProps) => {
    return {
        promotionList: state.fetchPromotion.promotionStore,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPromotion: () => dispatch(fetchPromotion())
    };
}

const PromotionModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PromotionModalLayout);

export default PromotionModal;
