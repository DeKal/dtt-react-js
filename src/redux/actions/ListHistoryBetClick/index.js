import { ActionTypes } from 'redux/actions/ActionTypes';

export const listHistoryBetClick = (tabSelected) => async dispatch => {
    return dispatch({
        type: ActionTypes.LIST_HISTORY_BET_CLICK,
        tabSelected: tabSelected
    });
}
