import { ActionTypes } from 'redux/actions/ActionTypes';

export const clearRecentBet = () => async dispatch => {
    return dispatch({
        type: ActionTypes.CLEAR_RECENT_BET
    });
}
