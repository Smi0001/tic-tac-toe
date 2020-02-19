import React from 'react'
// import { TEXT_CONSTANTS } from '../constants/constants'
// const { DEFAULT_POINTER_CLASS } = TEXT_CONSTANTS

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
                {/* disabled={ disabledProp ? true : null } */}
                { value }
            </button>
        )
    }
}

export default Box