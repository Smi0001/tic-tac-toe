import React from 'react'
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS, matrix, winnerBoxes } from '../constants/constants'
import reloadIcon from '../assets/reload.svg'
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
    reloadGame() {
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
    renderGrid() {
        const { boxArray, isGameOver } = this.state
        const grid = []
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            grid.push(
                <Box
                        boxIndex={ boxIndex }
                        value={ boxArray[boxIndex] }
                        onClick={ isGameOver ? null : this.boxClick.bind(this, boxIndex) }
                    />
            )
        }
        return grid
    }

    render() {
        const { currentPlayer, playerX, playerO, isGameOver } = this.state
        return (
            <div className="row">
                <div>
                    <div className="scoreboard">
                            <Scoreboard scoreX={ playerX } scoreO={ playerO } />
                    </div>
                    <div className="game-info">
                        <span>Current Player: </span>
                        <strong>{ currentPlayer }</strong>
                        <img src={reloadIcon} className="reset-icon m-l-15pcnt" onClick={this.reloadGame.bind(this)} />
                    </div>
                </div>
                <div className={"container container-3-col " + (isGameOver ? DEFAULT_POINTER_CLASS : "")}>
                    { this.renderGrid() }
                </div>
            </div>
        )
    }
}

export default Container
