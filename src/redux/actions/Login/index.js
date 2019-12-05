import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import ApiService from 'service/ApiService';
import { fetchUserInfo } from 'redux/actions/FetchUserInfo';
import { clearSid } from 'redux/actions/ClearSid/index.js';
import { Utils } from 'utils';

let loginInterval = null;

export const login = (info) => async dispatch => {
  try {
    const res = await axios.post(ApiService.LOGIN_API, ApiService.convertLoginInfoToApiInfo(info));
    const { data } = res;
    if (ApiService.validate(data)) {
      sessionStorage.setItem("userName", Utils.aesEncrypt(info.userName));
      sessionStorage.setItem("password", Utils.aesEncrypt(info.password));
      if (sessionStorage.getItem("lastLogin") === null)
        sessionStorage.setItem("lastLogin", Date.now());
      dispatch(fetchUserInfo(data.data.sid))
      if (loginInterval === null) {
        loginInterval = setInterval(() => {
          const isActive = sessionStorage.getItem("isActive")
          if (JSON.parse(isActive)) {
            dispatch(login(info));
          } else {
            dispatch(clearSid());
            Utils.clearUserCache();
            clearInterval(loginInterval);
            $('#sessionTimeoutModal').modal('show')
          }
          sessionStorage.setItem("isActive", false)
        }, 900000);
      }
      return dispatch({
        type: ActionTypes.LOGIN,
        payload: data.data.sid
      });
    }
    else {
      return dispatch({
        type: ActionTypes.INVALID_LOGIN,
        payload: "error"
      });
    }
  } catch ({ message }) {
    console.error(`Error fetching data: ${message}`);
  }
}
