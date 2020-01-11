import React, { Component } from "react";

class UserResolution extends Component {
    state = {
        value: this.props.content,
        ogContent: this.props.content,
        newPost: this.props.newPost ? this.props.newPost : false,
        showOptions: false
    }

    render() {
        return (
            <div className="userResolutions">
                <div className="number">
                    <h4>{this.props.index}</h4>
                </div>
                <div className="userResolution">
                    <p>{this.props.content}</p>
                </div>
            </div>
        )
    }
}

export default UserResolution
