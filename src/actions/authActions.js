import {LOGIN, LOGOUT, LOGIN_ERROR, STATUS} from "../constants/actionType";

export const login = payload => dispatch => {
    dispatch({
        type: LOGIN,
        payload
    });
};

export const logout = payload => dispatch => {
    dispatch({
        type: LOGOUT,
        payload
    });
};

export const loginError = (payload = true) => dispatch => {
    dispatch({
        type: LOGIN_ERROR,
        payload
    });
};

export const status = (payload) => dispatch => {
    dispatch({
        type: STATUS,
        status: payload
    });
};