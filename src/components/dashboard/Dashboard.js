import React, { Component } from "react";
import Resolution from './Resolution'
import SortItems from './SortItems'
import Nav from '../layout/Nav'
import Follow from './Follow'
import SignIn from '../layout/SignIn'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../../css/main.css'

class Dashboard extends Component {
    state = {
        addedResolutions: [1],
        sortBy: "none",
        totalData: 0,
        navOpen: false
    }

    addResolution = () => {
        let added = this.state.addedResolutions;
        added.push({
            //value
        })
        this.setState({
            addedResolutions: added
        })
    }

    setSortItem = (item) => {
        this.setState({
            sortBy: item
        })
    }

    closeResolution = () => {
        this.setState({
            addedResolutions: []
        })
    }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        })
    }

    componentDidUpdate() {
        // this.setState({
        //     totalData: resolutions.length,
        // })
        // const resolutions = this.props.resolutionInfo ? this.props.resolutionInfo : [];
        // console.log(resolutions.length)

    }

    render() {
        const auth = this.props.auth;
        const handle = this.props.profile.handle;
        const username = this.props.profile.username;
        const resolutions = this.props.resolutionInfo ? this.props.resolutionInfo : [];
        return (
            <div className="main_page">
                <SignIn/>
                <Follow/>
                <Link to={'/'}>
                    <div className="appTitle">
                        <h1>2020 <span>Resolve</span></h1>
                    </div>
                </Link>
                <Nav
                    handle={this.props.profile.method === 'twitter.com' ? '@' + (handle) : username}
                    toggleNav={this.toggleNav}
                />
                <SortItems
                    setSortItem={this.setSortItem}
                />
                <div className="header my_resolution">
                    <h1>My <span>2020</span> Goals </h1>
                </div>
                <div className="resolutions_container">
                    {resolutions.map((res, index) => {
                        if (!auth.uid || this.state.navOpen) { return null }
                        return (
                            <Resolution 
                                key={index}
                                profile={this.props.profile}
                                newPost={false}
                                uid={res.id}
                                resolutionID={res.documentID}
                                userPublicID={res.userDocRef}
                                locked={res.locked}
                                public={res.public}
                                content={res.content}
                                sortBy={this.state.sortBy}
                            />
                        )
                    })}
                </div>
                {this.state.addedResolutions.map((res, index) => {
                    return (
                        <Resolution 
                            key={index}
                            mode={'editing'}
                            profile={this.props.profile}
                            newPost={true}
                            content={""}
                            closeResolution={this.closeResolution}
                        />
                    )
                })}
                <div className={"addResolution " + (this.state.addedResolutions.length > 0 ? "display_none" : "")} onClick={this.addResolution}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>
        )
    }
}

 
const mapStateToProps = (state, ownProps) => {
    const resolutions = state.firestore.ordered['users/' + state.firebase.auth.uid + '/resolutions'];
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        resolutionInfo: resolutions
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
            collection: 'users/' + dispatch.getState().firebase.auth.uid + '/resolutions',
            orderBy: ['time', 'asc']
        }
    ])
)(Dashboard);