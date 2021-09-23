import {FETCH_ALL, SAVE_STATUS, GALLERY_ERROR, CLEAR_GALLERY_ERROR} from "../constants/actionType";
import {ALERT_TIME} from "../constants/constant";

export const fetchAll = payload => dispatch => {
    dispatch({
        type: FETCH_ALL,
        payload
    });
};

export const saveStatus = payload => dispatch => {
    dispatch({
        type: SAVE_STATUS,
        payload
    });
};

export const setError = payload => dispatch => {
    dispatch({
        type: GALLERY_ERROR,
        payload
    });
    setTimeout(() => {
        dispatch(clearError());
    }, ALERT_TIME);
};

export const clearError = payload => dispatch => {
    dispatch({
        type: CLEAR_GALLERY_ERROR,
        payload: ''
    });
};