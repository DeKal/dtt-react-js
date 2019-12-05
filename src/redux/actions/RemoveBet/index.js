import { ActionTypes } from 'redux/actions/ActionTypes';

export const removeBet = id => dispatch => {
  return dispatch({
    type: ActionTypes.REMOVE_A_BET,
    id: id
  });
}
