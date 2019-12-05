import React from 'react';
import { connect } from 'react-redux';
import { login } from 'redux/actions/Login/';
import { Translate } from "react-localize-redux";
import { showLogin } from 'redux/actions/ShowLogin';
import { getTranslate } from 'react-localize-redux';

class LoginPopupLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    render() {
        if (this.props.authenKey) return <div></div>
        return (
            <div id="login-popup" className="fixed-top">
                <div className="container">
                    <img className="login-logo" height='40px'
                        src="/assets/images/logo-full.png"
                    />
                    <div className="login-wrap">
                        <div className="login-html">
                            <label className="close" data-dismiss="modal" onClick={() => { this.props.closePopup(false) }}><i className="far fa-times fa-2x"></i></label>
                            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
                            <label htmlFor="tab-1" className="tab"><Translate id="Login" /></label>
                            <input id="tab-2" type="radio" name="tab" className="sign-up" />
                            <label htmlFor="tab-2" className="tab"></label>
                            <div className="login-form">
                                <div className="sign-in-htm">
                                    <div className="group">
                                        <label htmlFor="user" className="label" ><Translate id="Username" /></label>
                                        <input id="user" type="text" className="input" placeholder={this.props.translate("Username")}
                                            onChange={(e) => { this.onUserNameChange(e.target.value) }} />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label"><Translate id="Password" /></label>
                                        <input id="pass" type="password" className="input" data-type="password"
                                            placeholder={this.props.translate("Password")}
                                            onChange={(e) => { this.onPasswordChange(e.target.value) }} />
                                    </div>
                                    <div className="group">
                                        <div
                                            id="retrieve-login"
                                            onClick={() => {
                                                window.location = "https://member.liveguess.net/forget-password.html";
                                            }}>
                                            <Translate id="Forget password" />
                                        </div>
                                    </div>
                                    {this.renderLoginError()}
                                    <div className="group">
                                        <input type="submit" className="button" value={this.props.translate("Login")} onClick={() =>{
                                            this.props.login(this.state)
                                        }}/>
                                    </div>
                                    <div className="hr"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderLoginError() {
        if (this.props.invalidLogin)
            return <div className="group" style={{color: "red", fontSize: "15px"}}><Translate id="Invalid Username/Password" /></div>
        return <div></div>
    }

    onUserNameChange(userName) {
        this.setState({
            ...this.state,
            userName: userName
        })
    }

    onPasswordChange(password) {
        this.setState({
            ...this.state,
            password: password
        })
    }
}


const mapStateToProps = (state) => {
    return {
        authenKey: state.login.authenKey,
        invalidLogin: state.login.invalidLogin,
        translate: getTranslate(state.localize)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closePopup: (loginShow) => dispatch(showLogin(loginShow)),
        login: (info) => dispatch(login(info))
    }
};

const LoginPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPopupLayout);

export default LoginPopup;
