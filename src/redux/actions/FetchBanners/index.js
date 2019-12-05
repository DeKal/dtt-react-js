import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchBanners = () => async dispatch => {
    try {
        const res = await axios.get(`${ApiService.MARKET_API}?action=market.banners`);
        const { data } = res;
        if (ApiService.validate(data)) {
            return dispatch({
                type: ActionTypes.FETCH_BANNERS,
                payload: data.data
            });
        }
    } catch ({ message }) {
        console.log(`Error fetching open bet: ${message}`);
    }
}
