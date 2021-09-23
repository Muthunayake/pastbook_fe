import axios from 'axios';
import {getDefaultAuthHeader, getApiUrl} from "../helper";
import {fetchAll, saveStatus, setError} from "../actions/galleryActions";
import {ALERT_TIME} from "../constants/constant";

export const loadPhotos = () => dispatch => {
    axios.get(
        `${getApiUrl()}gallery/all`,
        getDefaultAuthHeader()
    )
    .then((response) => {
        if(response) dispatch(fetchAll(response));
    });
};

export const savePhotos = (data) => dispatch => {
    dispatch(saveStatus(true));
    axios.post(
        `${getApiUrl()}gallery/create`,
        {photos: data},
        getDefaultAuthHeader()
    )
    .then((response) => {
        setTimeout(() => {
            if (response) dispatch(saveStatus(false));
        }, ALERT_TIME);
    }).catch(error => {
        dispatch(saveStatus(false));
        if (error.response && error.response.status === 422) {
            dispatch(setError(error.response.data.errors.photos[0]));
        }
    });
};