import React, { Component } from 'react'

class SortItems extends Component {
    state = {
        sortItem: 'unlocked'
    }

    pickSortItem = (e) => {
        let sortItem = this.state.sortItem === e.target.id ? "" : e.target.id;
        // console.log(this.state.sortItem, e.target.id);
        this.setState({
            sortItem: sortItem
        })
        this.props.setSortItem(sortItem);
    }

    render() {
        return (
            <div className="sortItems">
                <button className={"unlocked item " + (this.state.sortItem === "unlocked" ? "highlited" : "")} id="unlocked" onClick={this.pickSortItem}>
                    <h4 id="unlocked">Unlocked</h4>
                </button>
                <button className={"locked item " + (this.state.sortItem === "locked" ? "highlited" : "")} id="locked" onClick={this.pickSortItem}>
                    <h4 id="locked">Locked</h4>
                </button>
                <button className={"visible item " + (this.state.sortItem === "visible" ? "highlited" : "")} id="visible" onClick={this.pickSortItem}>
                    <h4 id="visible">Public</h4>
                </button>
            </div>
        )
    }
}

export default SortItems

