import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const initCategory = () => async dispatch => {
    try {
      const { data } = await axios.post(`${ApiService.MARKET_API}?action=category.menu`);
      if (ApiService.validate(data)){
          return dispatch({
            type: ActionTypes.INIT_CATEGORY,
            payload: data.data
          });
      }
      else{
         console.error(`Error fetching data: ${data.error_msg}`);
      }
    } catch ({ message }) {
      console.error(`Error fetching data: ${message}`);
    }
}
