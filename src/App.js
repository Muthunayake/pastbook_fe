import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import Gallery from "./components/gallery";
import Login from "./components/auth/login";
import {GuardedRoute} from "./helper";

import "./App.css";

class App extends Component {
    render() {
        const {loggedIn} = this.props.auth;

        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <GuardedRoute
                    path="/"
                    exact
                    component={Gallery}
                    auth={loggedIn}
                />
                <Route
                    path="*"
                    render={() => (
                        <h1 className="text-center my-5">Page not Found</h1>
                    )}
                />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(App);
