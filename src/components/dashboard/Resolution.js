import React, {Component } from "react";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { addResolution, updateResolution, deleteResolution, toggleLock } from '../../store/actions/resolutionActions'

class Resolution extends Component {
    state = {
        locked: this.props.locked ? this.props.locked : false,
        ogLocked: this.props.locked ? this.props.locked : false,
        editing: this.props.mode ? this.props.mode : false,
        isPublic: this.props.public ? this.props.public : false,
        wasPublic: this.props.public ? this.props.public : false,
        value: this.props.content,
        ogContent: this.props.content,
        newPost: this.props.newPost ? this.props.newPost : false,
        showOptions: false
    }

    toggleEditor = (e) => {
        if(this.state.locked) {return false} else {
            this.setState({
                editing: !this.state.editing
            })
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    
    togglePublicity = (e) => {
        this.setState({
            isPublic: !this.state.isPublic
        })
    }

    toggleLockPost = (e) => {
        this.setState({
            locked: !this.state.locked
        })
        const resolutionData = {
            locked: !this.state.locked,
            uid: this.props.uid ? this.props.uid : '',
        }
        this.props.toggleLock(resolutionData); 
    }

    uploadResolution = (e) => {
        if(this.state.locked) {return}
        const handle = this.props.profile.handle;
        const username = this.props.profile.username;
        const resolutionData = {
            content: this.state.value,
            handle: handle,
            username: username,
            profilePicture: this.props.profile.photo,
            locked: this.state.locked,
            public: this.state.isPublic,
            uid: this.props.uid ? this.props.uid : '',
            resolutionID: this.props.resolutionID ? this.props.resolutionID : '',
            userPublicID: this.props.userPublicID ? this.props.userPublicID : '' 
        }
        
        if(this.state.newPost && this.state.value !== "") {
            this.props.addResolution(resolutionData, this.props.totalResolutions)
            // if (this.state.isPublic) {
            // } else {
            //     this.props.addResolutionToUser(resolutionData, this.props.totalResolutions)
            // }
            this.setState({
                newPost: false
            })
        } else if (!this.state.newPost && (this.state.value !== this.state.ogContent || this.state.isPublic !== this.state.wasPublic || this.state.locked !== this.state.ogLocked)){
            this.props.updateResolution(resolutionData); 
        }

        this.toggleEditor();
        if(this.props.newPost) {
            this.props.closeResolution();
        }
    }

    deleteResolution = (e) => {
        const handle = this.props.profile.handle;
        const resolutionData = {
            uid: this.props.uid,
            resolutionID: this.props.resolutionID,
            userPublicID: this.props.userPublicID,
            handle: handle
        }
        this.props.deleteResolution(resolutionData)
    }

    toggleOptions = () => {
        if(this.state.editing) {return }
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    componentDidMount () {
        // this.setState({
        //     locked: this.props.locked ? this.props.locked : false,
        //     ogLocked: this.props.locked ? this.props.locked : false,
        //     editing: this.props.mode ? this.props.mode : false,
        //     isPublic: this.props.public ? this.props.public : false,
        //     wasPublic: this.props.public ? this.props.public : false,
        //     value: this.props.content,
        //     ogContent: this.props.content,
        //     newPost: this.props.newPost ? this.props.newPost : false,
        //     showOptions: false
        // })
    }

    render() {
        const sortBy = this.props.sortBy;
        if(sortBy === "locked" && !this.props.newPost) {
            if (!this.state.locked) {
                return null
            }
        } else if (sortBy === "unlocked" && !this.props.newPost) {
            if (this.state.locked) {
                return null
            }
        } else if (sortBy === "visible" && !this.props.newPost) {
            if (!this.state.isPublic) {
                return null
            }
        }
        return (
            <div className={"resolutions" + (this.state.editing ? " editing" : "")}>
                <div className="resolution_box">
                    <button className="hiddenInput" onClick={this.toggleOptions} style={{
                        'position':'absolute',
                        'width' : '100%',
                        'height': '50px',
                        'left': '0px',
                        'right': '0px',
                        'margin': 'auto'
                    }}></button>
                    <div className="input" onClick={this.toggleOptions}>
                        <p>{this.state.value}</p>
                        <input type="text" onChange={this.onChange} className={(!this.state.editing ? "display_none" : "")} value={this.state.value} placeholder="Type your resolution here..."/>
                        <button onClick={this.toggleLockPost} id='1' className={"icon lock" + (this.state.editing ? " display_none" : (this.state.locked ? " locked" : " "))}>
                            <i className={"fas fa-" + (this.state.locked ? "lock" : "unlock")}></i>
                        </button>
                    </div>
                    <div className={"options " + ((this.state.showOptions || this.state.editing) ? " open" : "")}>
                        <button className={"edit-close option" + (this.state.locked ? " no_editing" : "")} onClick={this.state.editing ? this.uploadResolution : this.toggleEditor}>
                            <div className={"close icon " + (this.state.locked ? "no_editing" : "")}>
                                <h4>{this.state.editing ? (this.state.value === this.state.ogContent ? 'Close' : 'Update') : 'Edit'}</h4> <i className={"fas fa-" + (this.state.editing ? (this.state.value === this.state.ogContent ? 'times' : 'check') : "pen")}></i>
                            </div>
                        </button>
                        <button className="publicity-trash option" onClick={this.state.editing ? this.togglePublicity : this.deleteResolution}>
                            <div className={"publicity icon" + (!this.state.editing ? " display_none" : "")}>
                                <h4>{((this.state.isPublic) ? "Public" : "Not Public")}</h4> <i className={"fas fa-" + ((this.state.isPublic) ? "eye" : "eye-slash")}></i>
                            </div>
                            <div className={"delete icon" + (this.state.editing ? " display_none" : "")}>
                                <h4>Delete</h4> <i className="fas fa-trash-alt"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        signedIn: state.signingIn,
        totalResolutions: state.firestore.data.totals ? state.firestore.data.totals.totalResolutions.total : 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addResolution: (data, postID) => dispatch(addResolution(data, postID)),
        updateResolution: (data, postID) => dispatch(updateResolution(data, postID)),
        deleteResolution: (data, postID) => dispatch(deleteResolution(data, postID)),
        toggleLock: (data, postID) => dispatch(toggleLock(data, postID)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'totals' }
    ])
)(Resolution)
