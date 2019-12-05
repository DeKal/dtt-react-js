import { connect } from 'react-redux';
import BetCategoryLayout from 'components/common/BetCategory/BetCategoryLayout';

const mapStateToProps = (state, ownProps) => {
  return {
    categoryToParentMap: state.fetchCategory.mapToParent,
  };
};

const BetCategory = connect(
  mapStateToProps
)(BetCategoryLayout);

export default BetCategory;
