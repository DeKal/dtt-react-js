
import React from 'react';
import { connect } from 'react-redux';
import {fetchBetBySubCategoryId} from 'redux/actions/FetchBetBySubCategoryId';
import BodyLayout from './BodyLayout';

const mapStateToProps = (state) => {
    return {
        data: state.fetchBet.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPageDetail: (categoryId, id) => dispatch(fetchBetBySubCategoryId(categoryId, id))
    }
}

const MarketDetailBody = connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyLayout);

export default MarketDetailBody;
