import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchOpenBet = (sid) => async dispatch => {
    try {
        const res = await axios.get(`${ApiService.MARKET_API}?action=market.openbet&sid=${sid}`);
        const { data } = res;
        if (ApiService.validate(data)) {
            return dispatch({
                type: ActionTypes.FETCH_OPEN_BET,
                payload: data
            });
        }
    } catch ({ message }) {
        console.log(`Error fetching open bet: ${message}`);
    }
}
