import { ActionTypes } from 'redux/actions/ActionTypes';

export const showLogin = (loginState) => async dispatch => {
    return dispatch({
        type: ActionTypes.SHOW_LOGIN,
        payload: loginState
    });

}
