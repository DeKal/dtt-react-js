import { connect } from 'react-redux';
import SubCategoryLayout from 'components/common/SubCategory/SubCategoryLayout';
import ApiService from 'service/ApiService'

const mapStateToProps = (state, ownProps) => {
  const {categoryType, category} = ownProps;
  return {
    subCategories: ApiService.getSubCategoryFromMenu(state.fetchCategory.data, categoryType, category),
  }
};

const SubCategory = connect(
  mapStateToProps,
)(SubCategoryLayout);

export default SubCategory;
