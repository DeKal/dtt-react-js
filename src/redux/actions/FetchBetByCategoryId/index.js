import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

const fetchBetList = async (dispatch, categoryId) => {
  const res = await axios.get(`${ApiService.MARKET_API}?action=market.list&category_id=${categoryId}`)
  const { data } = res;
  if (ApiService.validate(data)){
    return dispatch({
      type: ActionTypes.FETCH_BET_BY_CATEGORY,
      payload: ApiService.mapApiBetToBet(data.data)
    });
  }
  else {
    return [];
  }
}

export const fetchBetByCategoryId = (categoryId) => dispatch => {
  try {
    fetchBetList(dispatch, categoryId);
    return dispatch({
      type: ActionTypes.FETCH_BET_BY_CATEGORY_LOADING
    });
  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
}
