import React, { Component } from 'react'

class Follow extends Component {
    state = {
        followOpened: false
    }

    toggleFollow = (e) => {
        this.setState({
            followOpened: !this.state.followOpened
        })
    }

    render() {
        return (
            <div className={"follow " + (this.state.followOpened ? "opened" : "")} onClick={this.toggleFollow}> 
                <div className="follow_button ">
                    <h4>follow</h4>
                </div>

                <div className="followIcons">
                        <div className="twitter icon">
                            <a href="https://twitter.com/2020resolve">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>

                        <div className="instagram icon">
                            <a href="https://www.instagram.com/2020resolve/">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Follow

