import React from 'react'

class Box extends React.Component {

    handleClick() {
        this.props.onClick && this.props.onClick()
    }

    render() {
        const { value, boxIndex, overridingClass } = this.props
        let dynamicClasses = ["box "]
        dynamicClasses.push(overridingClass ? overridingClass : "")

        return (
            <button
                key={boxIndex}
                id={boxIndex}
                className={ dynamicClasses.join(" ") }
                onClick={this.handleClick.bind(this)}
            >
                { value }
            </button>
        )
    }
}

export default Box