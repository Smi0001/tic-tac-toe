import React from 'react'
import Box from './Box'

const X_TEXT = 'X'
const O_TEXT = 'O'
const boxMatrix = [
    null, null, null,
    null, null, null,
    null, null, null,
]

class Container extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boxArray: boxMatrix.slice(),
            nextPlayer: X_TEXT
        }
    }

    boxClick(boxIndex) {
        const boxArray = this.state.boxArray.slice()
        const nextPlayer = this.state.nextPlayer
            boxArray[boxIndex] = nextPlayer
        this.setState({
            boxArray,
            nextPlayer: nextPlayer === X_TEXT ? O_TEXT : X_TEXT,
        })
    }
    renderBox(boxIndex) {
        
        return <Box
                    value={this.state.boxArray[boxIndex]}
                    onClick={this.boxClick.bind(this, boxIndex)}
                />
    }

    render() {

        return (
            <div className="container">
                <div className="game-info">Next Player: <strong>{this.state.nextPlayer}</strong> </div>
                <div className="row">   
                    { this.renderBox(0) }
                    { this.renderBox(1) }
                    { this.renderBox(2) }
                </div>
                <div className="row">
                    { this.renderBox(3) }
                    { this.renderBox(4) }
                    { this.renderBox(5) }
                </div>
                <div className="row">
                    { this.renderBox(6) }
                    { this.renderBox(7) }
                    { this.renderBox(8) }
                </div>
            </div>
        )
    }
}

export default Container