import axios from 'axios';
import {getDefaultAuthHeader, getApiUrl} from "../helper";

export const authenticate = (accessToken, data) => dispatch => {
    axios.post(
        `${getApiUrl()}authenticate`,
        {
            name: data.name,
            email: data.email,
            password: data.email,
            api_token: accessToken,
        },
        getDefaultAuthHeader()
    )
    .then((response) => {
        if (response) {
            localStorage.setItem("auth", JSON.stringify({
                response: response.data,
                loggedIn: true
            }));  
        }
    });
};
