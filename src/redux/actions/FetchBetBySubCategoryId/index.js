import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

const fetchBets = async (dispatch, categoryId, subCategoryId, action) => {
  const res = await axios.get(`${ApiService.MARKET_API}?action=market.read&category_id=${categoryId}&id=${subCategoryId}`);
  const { data } = res;
  if (ApiService.validate(data)){
    return dispatch({
      type: typeof action !== "undefined" ? action : ActionTypes.FETCH_BET_BY_CATEGORY,
      payload: ApiService.mapApiBetToBet([data.data])
    });
  }
  else {
    console.warn("Failed validate response")
    return [];
  }
}

export const fetchBetBySubCategoryId = (categoryId, subCategoryId, action) => dispatch => {
  try {
      fetchBets(dispatch, categoryId, subCategoryId, action);
      return dispatch({
        type: ActionTypes.FETCH_BET_BY_CATEGORY_LOADING
      });

  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
}
