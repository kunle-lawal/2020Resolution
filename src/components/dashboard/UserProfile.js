import React, { Component } from "react";
import Nav from '../layout/Nav'
import Share from './Follow'
import UserResolution from './UserResolution'
import '../../css/userProfile.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import dog from '../../assets/dog_pic.jpg'

class UserProfile extends Component {
    state = {
        addedResolutions: [],
        sortBy: "none",
        navOpen: false
    }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        })
    }

    render() {
        const handle = this.props.profile.handle;
        const username = this.props.profile.username;
        const resolutions = this.props.resolutionInfo ? this.props.resolutionInfo : [];
        const profilePic = this.props.profilePicture === '' ? dog : this.props.profilePicture
        let resolutionIndex = 0;
        return (
            <div className="main_page">
                <Share />
                <Link to={'/'}>
                    <div className="appTitle">
                        <h1>2020 <span>Resolve</span></h1>
                    </div>
                </Link>
                <Nav
                    handle={this.props.profile.method === 'twitter.com' ? '@' + (handle) : username}
                    toggleNav={this.toggleNav}
                />

                <div className="userProfileContainer">
                    <div className="userProfile">
                        <div className="header"></div>
                        <div className={"userInfo " + (this.state.navOpen ? "display_none" : '')}>
                            <div className="user">
                                <div className="userProfilePicture" style={{
                                    'backgroundImage': `url(${profilePic})`,
                                    'backgroundSize': 'cover',
                                    'backgroundRepeat': 'no-repeat',
                                    'backgroundPosition': 'center'
                                }} >
                                    <img draggable src={profilePic} alt={"Profile Picture of " + this.props.name} style={{
                                        'position' : 'absolute',
                                        'opacity' : '0'
                                    }} />
                                </div>

                                <div className="username">
                                    <h2>{this.props.name}'s</h2>
                                    <br/>
                                    <h4>@{this.props.user}</h4>
                                </div>

                                <div className="center">
                                    <br/>
                                    <h3><span>Resolutions</span></h3>
                                </div>
                            </div>

                            <div className="resolution_container">
                                {resolutions.map((res, index) => {
                                    if(res.content !== "") {
                                        console.log(res);
                                        resolutionIndex += 1;
                                        return (
                                            <UserResolution
                                                key={index}
                                                index={resolutionIndex}
                                                content={res.content}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const resolutionInfo = state.firestore.ordered['userProfile/' + ownProps.match.params.id + '/resolutions']; 
    const profileData = state.firestore.ordered.userProfile ? state.firestore.ordered.userProfile[0] : []; 
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        profilePicture: profileData ? profileData.photo : '',
        user: ownProps.match.params.id,
        name: profileData ? profileData.username : 'User does not exist',
        resolutionInfo: resolutionInfo ? resolutionInfo : []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        {
            collection: 'userProfile',
            doc: props.match.params.id
        }
    ]),
    firestoreConnect((props, dispatch) => [
        {
            collection: 'userProfile/' + props.match.params.id + "/resolutions",
            orderBy: ['time', 'desc']
        }
    ])
)(UserProfile);