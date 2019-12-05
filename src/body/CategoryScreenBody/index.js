import { connect } from 'react-redux';
import {fetchBetByCategory} from 'redux/actions/FetchBetByCategory'
import {fetchBetByCategoryId} from 'redux/actions/FetchBetByCategoryId'
import {fetchBetBySubCategoryId} from 'redux/actions/FetchBetBySubCategoryId'
import BodyLayout from './BodyLayout';
import { BET_ID } from 'consts';
import ApiService from 'service/ApiService'

const mapStateToProps = (state, ownProps) => {
  const {categoryType, category, subCategory} = ownProps;

  return {
    data: ApiService.filterBetByCategory(state.fetchBet),
    categories: ApiService.getSubCategoryFromMenu(state.fetchCategory.data, categoryType, category),
    categoryId: ApiService.getCategoryIdFromMenu(state.fetchCategory.data, categoryType, category),
    subCategoryId: ApiService.getSubCategoryIdFromMenu(state.fetchCategory.data, categoryType, category, subCategory)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBetByCategory: (categories) => dispatch(fetchBetByCategory(categories)),
    fetchBetByCategoryId: (categoryId) => dispatch(fetchBetByCategoryId(categoryId)),
    fetchBetBySubCategoryId: (categoryId, subCategoryId) => dispatch(fetchBetBySubCategoryId(categoryId, subCategoryId))
  }
};

const Body = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyLayout);

export default Body;
