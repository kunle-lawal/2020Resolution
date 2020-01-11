import React, { Component } from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Share extends Component {
    state = {
        navClosed: true
    }

    toggleNav = (e) => {
        this.setState({
            navClosed: !this.state.navClosed
        })
        document.body.style.overflowY = this.state.navClosed ? "hidden" : "auto";
        document.documentElement.scrollTop = 0;
        this.props.toggleNav();
    }

    render() {
        const auth = this.props.auth
        return (
            <>
                <div className="navigation">
                    <nav>
                        <button className={"hamburger " + (this.state.navClosed ? "" : "opened")} onClick={this.toggleNav}>
                            <div className="patty"></div>
                            <div className="patty"></div>
                            <div className="patty"></div>
                        </button>
                    </nav>
                </div>

                <div className={"fullNav " + (this.state.navClosed ? "" : "show")}>
                    <div className="username">
                        <h4>Hello <span>{auth.uid ? this.props.handle : " Please Sign in"}</span></h4>
                    </div>
                    <div className="moreInfo">
                        <div className="quote">
                            <h1></h1>
                        </div>
                    </div>
                    {/* <div className="center">
                        <h4>report bugs here:</h4>
                    </div> */}
                    {/* <Footer /> */}
                </div>
           </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Share);
