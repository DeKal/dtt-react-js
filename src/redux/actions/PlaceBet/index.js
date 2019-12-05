import { ActionTypes } from 'redux/actions/ActionTypes';

export const placeBet = (authenKey) => dispatch => {
  localStorage.setItem("isActive", true)
  return dispatch({
    type: ActionTypes.PLACE_BET,
    authenKey: authenKey
  });
}
