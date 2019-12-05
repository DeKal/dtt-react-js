import { ActionTypes } from 'redux/actions/ActionTypes';

export const clearSid = () => dispatch => {
  return dispatch({
    type: ActionTypes.CLEAR_SID
  });
}
