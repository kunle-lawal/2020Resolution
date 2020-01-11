import React, { Component } from 'react'
import { signIn, login } from '../../store/actions/authActions'
import { connect } from 'react-redux'

export class SignIn extends Component {
    state = {
        signingIn: {
            twitter: false,
            facebook: false
        },
        signedIn: false
    }

    signInUser = (e) => {
        const auth = this.props.auth;
        if (auth.uid) { return 0 }
        this.props.signIn({}, e.target.id)
    }

    componentDidMount() {
        if(this.props.auth.uid) {
            this.props.login({}, this.props.auth.providerData[0].providerId)
        }
    }

    render() {
        const auth = this.props.auth;
        if (auth.uid) {return null}
        return (
            <div className="signIn_container">
                <div className="signIn">
                    <div className="signIn-title">
                        <h2>Sign In</h2>
                    </div>

                    <div className="signIn-buttons">
                        <button className={"signIn-buttons-twitter signIn_button btn " + (this.state.signingIn.twitter ? "signingIn" : "")} id='twitter' onClick={this.signInUser}>
                            <i className="fab fa-twitter" id='twitter'></i>
                            <span id='twitter'>Sign in with Twitter</span>
                        </button>

                        <button className={"signIn-buttons-facebook signIn_button btn " + (this.state.signingIn.facebook ? "signingIn" : "")} id="facebook" onClick={this.signInUser}>
                            <i className="fab fa-facebook-f" id="facebook"></i>
                            <span id="facebook">Sign in with Facebook</span>
                        </button>

                        <button className={"signIn-buttons-google signIn_button btn " + (this.state.signingIn.google ? "signingIn" : "")} id="google" onClick={this.signInUser}>
                            <i className="fab fa-google" id="google"></i>
                            <span id="google">Sign in with Google</span>
                        </button>
                    </div>

                    <h4 className="red-text" style={{"fontWeight": 900}}>we will redirected you to this page</h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        signedIn: state.signingIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (userInfo, type) => dispatch(signIn(userInfo, type)),
        login: (userInfo, type) => dispatch(login(userInfo, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
