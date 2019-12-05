
import { ActionTypes } from 'redux/actions/ActionTypes';

export const updateBet = (bet) => dispatch => {
  return dispatch({
    type: ActionTypes.UPDATE_BET,
    updateBet: bet
  });
}
