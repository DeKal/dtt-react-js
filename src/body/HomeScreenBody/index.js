
import { connect } from 'react-redux';
import { fetchHomeData } from 'redux/actions/FetchHomeData/';
import BodyLayout from './BodyLayout';
import { BET_ID } from 'consts';
import ApiService from 'service/ApiService'

const mapStateToProps = (state) => {
  return {
    data: ApiService.filterBetByCategory(state.fetchBet),
    category: state.fetchCategory.data
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initHome: (categories) => dispatch(fetchHomeData(categories))
  }
};

const Body = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyLayout);

export default Body;
