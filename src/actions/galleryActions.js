import {FETCH_ALL, SAVE_STATUS} from "../constants/actionType";

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