import React from 'react';

class Box extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null,
        }
    }
    handleClick() {
        console.log('Box is clicked')
        this.props.onClick && this.props.onClick()
    }

    render() {
        return (
            <button className="box" onClick={this.handleClick.bind(this)} >
                {this.props.value}
            </button>
        )
    }
}

export default Box