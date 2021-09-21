import React from "react";
import {Route, Redirect} from "react-router-dom";

export function getApitoken() {
    let authState = JSON.parse(localStorage.getItem("auth"));
    return authState.response.user.api_token;
};

export function getApiUrl() {
    return "http://127.0.0.1:8000/api/";
};

export function getDefaultAuthHeader(config = {}) {
    return {
        headers: {
            ...config,
            Accept : 'application/json',
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
