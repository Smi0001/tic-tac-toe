import React from 'react'
import Box from './Box'
import { TEXT_CONSTANTS } from '../constants/constants'

const { GAME_TIC_TAC_TOE, PLAYER_X, PLAYER_O } = TEXT_CONSTANTS
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
        const { scoreX, scoreO } = nextProps
        if (scoreX || scoreO) {
            // get score from session and set back to session
            const scoreObj = getScores()
            var scores = {}
            scores[PLAYER_X] = scoreObj[PLAYER_X] + (scoreX ? Number(scoreX) : 0)
            scores[PLAYER_O] = scoreObj[PLAYER_O] + (scoreO ? Number(scoreO) : 0)
            this.setState({
                ...scores
            })
            const scoreStr = JSON.stringify(
                { ...scores }
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
            <div >
                <button onClick={this.resetScore.bind(this)}>Reset Game &amp; Score</button>
                <div className="row game-info">
                    <div className="score-title">
                        <span className="">Player X</span>
                        <span className="m-l-15">Player O</span>
                    </div>
                </div>
                <div className="row">
                    <Box value={ this.state[PLAYER_X] } />
                    <Box value={ this.state[PLAYER_O] } />
                </div>
            </div>
        )
    }
}

export default Scoreboard