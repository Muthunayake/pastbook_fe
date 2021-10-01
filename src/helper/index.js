import React from "react";
import {Route, Redirect} from "react-router-dom";

export function getApitoken() {
    const authState = JSON.parse(localStorage.getItem("auth"));
    if (authState)
        return authState.response.user.api_token;
    else 
        return null;
};

export function getApiUrl() {
    return process.env.REACT_APP_BACKEND_ENDPOINT;
};

export function getDefaultAuthHeader(config = {}) {
    return {
        headers: {
            ...config,
            Accept : 'application/json',
            Authorization: `Bearer ${getApitoken()}`
        }
    }
};

export const GuardedRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);
