import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {doLogin} from "../../services/facebookService";

class Login extends PureComponent {
    constructor (props) {
        super();
    };

    componentDidUpdate() {
        const {auth, history} = this.props;

        if (auth.loggedIn === true) history.push('/');
    };

    render(){
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-md-6 pt-5">
                        <div className="card">
                            <div className="card-body p-5">
                                <h3 className="card-title">Login with Facebook</h3>
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-primary" type="button" onClick={this.props.doLogin}>
                                        <i className="fa fa-facebook-official" aria-hidden="true"></i> Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    doLogin: (payload) => dispatch(doLogin(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

