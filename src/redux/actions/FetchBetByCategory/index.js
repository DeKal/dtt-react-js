import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchBetByCategory = (categories) => dispatch => {
  try {
    const promises = [];
    categories.map((category) => {
      promises.push(
        axios.get(`${ApiService.MARKET_API}?action=market.list&category_id=${category.id}`)
            .then(function(response) {
                if (ApiService.validate(response.data)){
                  return response.data.data
                }
                else {
                  return [];
                }
            })
      );
    })

    Promise.all(promises).then(function(bets) {
      let allBets = [];
      bets.map((bet) => {
        allBets = allBets.concat(bet)
      })
      return dispatch({
        type: ActionTypes.FETCH_BET_BY_CATEGORY,
        payload: ApiService.mapApiBetToBet(allBets)
      });
    });

    return dispatch({
      type: ActionTypes.FETCH_BET_BY_CATEGORY_LOADING
    });
  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
}
