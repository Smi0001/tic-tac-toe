import React from 'react'
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS, matrix, winnerBoxes } from '../constants/constants'
const { X_TEXT, O_TEXT, WINNER_CLASS, PLAYER_X, PLAYER_O, DEFAULT_POINTER_CLASS } = TEXT_CONSTANTS

class Container extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boxArray: matrix.slice(),
            currentPlayer: X_TEXT,
            playerX: 0,
            playerO: 0,
            winnerBoxArray:[],
        }
    }

    colorBox(winnerBoxArray, isReset) {
        for (var boxIndex = 0; boxIndex < winnerBoxArray.length; boxIndex++) {
            var boxElement = document.getElementById( winnerBoxArray[boxIndex] )
            isReset ? boxElement.classList.remove(WINNER_CLASS) : boxElement.classList.add(WINNER_CLASS)
        }
    }
    resetGame() {
        // commenting as this triggers Scoreboard.UNSAFE_componentWillReceiveProps() and affects score
        // this.colorBox(
        //     this.state.winnerBoxArray,
        //     true
        // )
        // this.setState({
        //     isGameOver: false,
        //     currentPlayer: X_TEXT,
        //     boxArray: matrix.slice(),
        //     winnerBoxArray: [],
        // })
        window.location.reload()
    }
    checkGameOver() {
        var { boxArray, playerX, playerO, isGameOver } = this.state
        let winner = {}
        let rowIndex
        for (rowIndex = 0; rowIndex < winnerBoxes.length; rowIndex++) {
            const [a, b, c] = winnerBoxes[rowIndex];
            if (!isGameOver && boxArray[a] && boxArray[a] === boxArray[b] && boxArray[a] === boxArray[c]) {
                isGameOver = true
                if (boxArray[a] === X_TEXT) {
                    winner = { [PLAYER_X]: playerX + 1 }
                } else {
                    winner = { [PLAYER_O]: playerO + 1 }
                }
                break;
            }
        }
        let winnerBoxArray = winnerBoxes[rowIndex]
        if (isGameOver && winnerBoxArray) {
            this.colorBox(winnerBoxes[rowIndex], false)
        }
        this.setState({
            isGameOver,
            ...winner,
            winnerBoxArray: winnerBoxArray ? winnerBoxArray : [],
        })
    }
    boxClick(boxIndex) {
        const boxArray = this.state.boxArray.slice()
        const currentPlayer = this.state.currentPlayer
            boxArray[boxIndex] = currentPlayer
        this.setState({
            boxArray,
            currentPlayer: currentPlayer === X_TEXT ? O_TEXT : X_TEXT,
        }, () =>
            this.checkGameOver()
        )
    }
    renderBox(boxIndex) {
        const { boxArray, isGameOver } = this.state
        return <Box
                    boxIndex={ boxIndex }
                    value={ boxArray[boxIndex] }
                    onClick={ isGameOver ? null : this.boxClick.bind(this, boxIndex) }
                />
    }

    render() {
        const { currentPlayer, playerX, playerO, isGameOver } = this.state
        return (
            <div>
                <div className="container">
                    <button onClick={this.resetGame.bind(this)}>Reset Game</button>
                    <div className="row" >
                        <div className="game-info">Current Player: <strong>{ currentPlayer }</strong> </div>
                    </div>
                    <div className={`row ${isGameOver ? DEFAULT_POINTER_CLASS : ''} `}>
                        { this.renderBox(0) }
                        { this.renderBox(1) }
                        { this.renderBox(2) }
                    </div>
                    <div className={`row ${isGameOver ? DEFAULT_POINTER_CLASS : ''} `}>
                        { this.renderBox(3) }
                        { this.renderBox(4) }
                        { this.renderBox(5) }
                    </div>
                    <div className={`row ${isGameOver ? DEFAULT_POINTER_CLASS : ''} `}>
                        { this.renderBox(6) }
                        { this.renderBox(7) }
                        { this.renderBox(8) }
                    </div>
                </div>
                <div className="scoreboard">
                    <Scoreboard scoreX={ playerX } scoreO={ playerO } />
                </div>
            </div>
        )
    }
}

export default Container
