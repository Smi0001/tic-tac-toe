import React from 'react'

class Box extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null,
        }
    }
    handleClick() {
        this.props.onClick && this.props.onClick()
    }

    render() {
        const { value, boxIndex } = this.props
        return (
            <button id={boxIndex} className="box" onClick={this.handleClick.bind(this)} >
                { value }
            </button>
        )
    }
}

export default Box