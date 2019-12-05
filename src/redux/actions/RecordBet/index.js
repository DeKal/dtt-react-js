import uuid from 'uuid';
import { ActionTypes } from 'redux/actions/ActionTypes';

export const recordBet = (ratio, odd, bet) => dispatch => {
  return dispatch({
    type: ActionTypes.RECORD_A_BET,
    bet: {
      action: odd,
      ratio: ratio,
      detail: bet,
      value: typeof bet.value !== "undefined" ? bet.value : "",
      id: uuid.v4()
    }
  });
}
