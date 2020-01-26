import React from 'react'
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS, matrix, winnerBoxes } from '../constants/constants'
import reloadIcon from '../assets/reload.svg'
const {
    X_TEXT,
    O_TEXT,
    WINNER_CLASS,
    PLAYER_X,
    PLAYER_O,
    DEFAULT_POINTER_CLASS,
    CURRENT_PLAYER_TEXT,
    WINNER_TEXT,
    MATCH_DRAW_TEXT,
} = TEXT_CONSTANTS

class Container extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boxArray: matrix.slice(),
            currentPlayer: X_TEXT,
            playerX: 0,
            playerO: 0,
            winnerBoxArray:[],
            info: CURRENT_PLAYER_TEXT,
            availableBoxCounter: 9,
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
    declareWinner(winnerBoxIndex, winnerBoxArray) {
        const { playerX, playerO, boxArray, availableBoxCounter } = this.state
        let winner = {}
        if (boxArray[winnerBoxIndex] === X_TEXT) {
            winner = { [PLAYER_X]: playerX + 1 }
        } else {
            winner = { [PLAYER_O]: playerO + 1 }
        }
        this.colorBox(winnerBoxArray, false)
        this.setState({
            isGameOver: true,
            ...winner,
            winnerBoxArray,
            info: WINNER_TEXT + boxArray[winnerBoxIndex],
        })
    }
    checkGameOver() {
        var { boxArray, isGameOver, availableBoxCounter } = this.state
        let rowIndex
        for (rowIndex = 0; rowIndex < winnerBoxes.length; rowIndex++) {
            const [a, b, c] = winnerBoxes[rowIndex];
            if (!isGameOver && boxArray[a] && boxArray[a] === boxArray[b] && boxArray[a] === boxArray[c]) {
                this.declareWinner(a, [a, b, c])
                return false
                // break;
            }
        }
        // when no available box is available this snippet executes only when declareWinner() is not called
        console.log('checkGameOver', availableBoxCounter)
        if (availableBoxCounter === 0) { 
            this.setState({
                isGameOver: true,
                info: MATCH_DRAW_TEXT,
            })
            this.colorBox(winnerBoxes[0])
            this.colorBox(winnerBoxes[1])
            this.colorBox(winnerBoxes[1])
        }
    }
    boxClick(boxIndex) {
        const {boxArray, currentPlayer, availableBoxCounter } = this.state
        const boxArrayCopy = boxArray.slice()
        boxArrayCopy[boxIndex] = currentPlayer
        this.setState({
            boxArray: boxArrayCopy,
            currentPlayer: currentPlayer === X_TEXT ? O_TEXT : X_TEXT,
            availableBoxCounter: availableBoxCounter - 1,
        }, () =>
            this.checkGameOver()
        )
    }
    renderGrid() {
        const { boxArray, isGameOver, winnerBoxArray } = this.state
        const grid = []
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            let alreadyClicked = boxArray[boxIndex] !== null
            let dynamicClasses = []
            dynamicClasses.push( winnerBoxArray.includes(boxIndex) ? WINNER_CLASS : '' )
            dynamicClasses.push( isGameOver || alreadyClicked ? DEFAULT_POINTER_CLASS : '' )
            grid.push(
                <Box
                    key={ boxIndex }
                    overridingClass={ dynamicClasses.join(" ") }
                    boxIndex={ boxIndex }
                    value={ boxArray[boxIndex] }
                    onClick={ isGameOver || alreadyClicked ? null : this.boxClick.bind(this, boxIndex) }
                />
                    // disabledProp={ isGameOver ? true : null }
            )
        }
        return grid
    }

    render() {
        const { currentPlayer, playerX, playerO, info, isGameOver } = this.state
        return (
            <div className="row">
                <div>
                    <div className="scoreboard">
                            <Scoreboard scoreX={ playerX } scoreO={ playerO } />
                    </div>
                    <div className="game-info">
                        {
                            isGameOver 
                        ?   <strong>{ info }</strong>
                        :   <strong>{ CURRENT_PLAYER_TEXT + currentPlayer }</strong>
                        }
                        <img alt="Reload" src={reloadIcon} className="reset-icon m-l-15pcnt" onClick={this.reloadGame.bind(this)} />
                    </div>
                </div>
                <div className={"container container-3-col"}>
                    { this.renderGrid() }
                </div>
            </div>
        )
    }
}

export default Container
