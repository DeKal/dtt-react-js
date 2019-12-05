import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchHistoryBet = (authenKey) => async dispatch => {
  if(authenKey === "")
    return;
  const res = await axios.get(`${ApiService.MARKET_API}?action=market.historybet&sid=${authenKey}`);
  const { data } = res;
  if (ApiService.validate(data)){
    return dispatch({
      type: ActionTypes.FETCH_HISTORY_BET,
      payload: data.data
    });
  }
}
