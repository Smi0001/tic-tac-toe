import React from 'react'
import Box from './Box'
import { TEXT_CONSTANTS } from '../constants/constants'
import refreshIcon from '../assets/recycle.svg'

const { GAME_TIC_TAC_TOE, PLAYER_X, PLAYER_O, DEFAULT_POINTER_CLASS } = TEXT_CONSTANTS
const getScores = function() {
    const scoreObj = sessionStorage.getItem(GAME_TIC_TAC_TOE)
    return scoreObj
        ? JSON.parse(scoreObj)
        : {
            [PLAYER_X]: 0,
            [PLAYER_O]: 0,
        }
}

class Scoreboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            [PLAYER_X]: 0,
            [PLAYER_O]: 0,
        }
    }
    componentDidMount() {
        this.setScoreFromStorage()
    }

    setScoreFromStorage() {
        const scoreObj = getScores()
        if(scoreObj) {
            this.setState({
                [PLAYER_X]: scoreObj[PLAYER_X],
                [PLAYER_O]: scoreObj[PLAYER_O],
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { playerX, playerO } = nextProps && nextProps.scores
        console.log(nextProps.scores)
        if (playerX || playerO) {
            // get score from session and set back to session
            const scoreObj = getScores()
            var localScores = {}
            localScores[PLAYER_X] = scoreObj[PLAYER_X] + (playerX ? Number(playerX) : 0)
            localScores[PLAYER_O] = scoreObj[PLAYER_O] + (playerO ? Number(playerO) : 0)
            this.setState({
                ...localScores
            })
            const scoreStr = JSON.stringify(
                { ...localScores }
            )
            sessionStorage.setItem(
                GAME_TIC_TAC_TOE,
                scoreStr
            )
        }
    }
    resetScore() {
        sessionStorage.clear()
        this.setScoreFromStorage()
        window.location.reload()
    }
    render() {
        return (
            <div className="row">
                <div className="game-info">
                    <span className="">Player X</span>
                    <span className="m-l-15">Player O</span>
                </div>
                <div className="score-box">
                    <Box overridingClass={ DEFAULT_POINTER_CLASS } value={ this.state[PLAYER_X] } />
                    <Box overridingClass={ DEFAULT_POINTER_CLASS } value={ this.state[PLAYER_O] } />
                    <img alt="Refresh" src={refreshIcon} className="reset-icon" onClick={this.resetScore.bind(this)} title="Reset Game" />
                </div>
            </div>
        )
    }
}

export default Scoreboard