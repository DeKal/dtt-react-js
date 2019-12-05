import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchPromotion = () => async dispatch => {
    try {
        const res = await axios.get(`${ApiService.MARKET_API}?action=market.promote`);
        const { data } = res;
        if (ApiService.validate(data)) {
            return dispatch({
                type: ActionTypes.FETCH_PROMOTION,
                payload: data.data
            });
        }
    } catch ({ message }) {
        console.log(`Error fetching open bet: ${message}`);
    }
}
