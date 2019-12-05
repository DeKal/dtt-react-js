
import React from 'react';
import { connect } from 'react-redux';
import {fetchBetBySubCategoryId} from 'redux/actions/FetchBetBySubCategoryId';
import BodyLayout from './BodyLayout';
import ApiService from 'service/ApiService'

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

const NewsDetailBody = connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyLayout);

export default NewsDetailBody;
