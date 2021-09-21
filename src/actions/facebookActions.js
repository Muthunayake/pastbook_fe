import {ALL_PHOTOS} from "../constants/actionType";

export const setPhotos = payload => dispatch => {
    dispatch({
        type: ALL_PHOTOS,
        payload
    });
};
