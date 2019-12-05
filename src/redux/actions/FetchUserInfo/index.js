import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';

export const fetchUserInfo = (authenKey) => async dispatch => {
    if(authenKey === "")
      return;
    try {
      const res = await axios.get(`${ApiService.LOGIN_API}?action=user.info&sid=${authenKey}`);
      const { data } = res;
      if (ApiService.validate(data)){
          return dispatch({
            type: ActionTypes.FETCH_USER_INFO,
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
