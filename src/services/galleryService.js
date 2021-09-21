import axios from 'axios';
import {getDefaultAuthHeader, getApiUrl, getApitoken} from "../helper";
import {fetchAll, saveStatus} from "../actions/galleryActions";

export const loadPhotos = () => dispatch => {
    axios.get(
        `${getApiUrl()}gallery/all?api_token=${getApitoken()}`,
    )
    .then((response) => {
        if(response) dispatch(fetchAll(response))
    });
};

export const savePhotos = (data) => dispatch => {
    dispatch(saveStatus(true))
    axios.post(
        `${getApiUrl()}gallery/create`,
        {
            api_token: getApitoken(),
            data
        },
        getDefaultAuthHeader()
    )
    .then((response) => {
        setTimeout(() => {
            if (response) dispatch(saveStatus(false));
        }, 3000);
    });
};