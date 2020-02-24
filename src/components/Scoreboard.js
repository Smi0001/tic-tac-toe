import { connect } from 'react-redux';
import React from 'react'
import Box from './Box'
import { TEXT_CONSTANTS } from '../constants/constants'
import refreshIcon from '../assets/recycle.svg'

const {
    GAME_TIC_TAC_TOE,
    PLAYER_X,
    PLAYER_O,
    SCORE_X,
    SCORE_O,
    DEFAULT_POINTER_CLASS,
} = TEXT_CONSTANTS
const getScores = function() {
    const scoreObj = sessionStorage.getItem(GAME_TIC_TAC_TOE)
    return scoreObj
        ? JSON.parse(scoreObj)
        : {
            [SCORE_X]: 0,
            [SCORE_O]: 0,
        }
}

class Scoreboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            [SCORE_X]: 0,
            [SCORE_O]: 0,
        }
    }

    componentDidMount() {
        this.setScoreFromStorage()
    }

    setScoreFromStorage() {
        const scoreObj = getScores()
        if(scoreObj) {
            this.setState({
                [SCORE_X]: scoreObj[SCORE_X],
                [SCORE_O]: scoreObj[SCORE_O],
            })
        }
    }

    resetScore() {
        sessionStorage.clear()
        window.location.reload()
    }

    updateScore(nextProps) {
        const { playerX, playerO } = nextProps
        if (playerX || playerO) {
            // get score from session and set back to session
            const scoreObj = getScores()
            var localScores = {}
            localScores[SCORE_X] = scoreObj[SCORE_X] + (playerX ? Number(playerX) : 0)
            localScores[SCORE_O] = scoreObj[SCORE_O] + (playerO ? Number(playerO) : 0)
            const scoreStr = JSON.stringify(
                { ...localScores }
            )
            sessionStorage.setItem(
                GAME_TIC_TAC_TOE,
                scoreStr
            )
        }
    }

    render() {
        this.updateScore(this.props)
        let { playerX, playerO } = this.props
        return (
            <div className="row">
                <div className="game-info">
                    <span className="">Player X</span>
                    <span className="m-l-15">Player O</span>
                </div>
                <div className="score-box">
                    <Box overridingClass={ DEFAULT_POINTER_CLASS } value={ this.state[SCORE_X] + (playerX ? Number(playerX) : 0) } />
                    <Box overridingClass={ DEFAULT_POINTER_CLASS } value={ this.state[SCORE_O] + (playerO ? Number(playerO) : 0) } />
                    <img alt="Refresh" src={refreshIcon} className="reset-icon" onClick={this.resetScore.bind(this)} title="Reset Score" />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        [PLAYER_X]: state.reducerState[PLAYER_X],
        [PLAYER_O]: state.reducerState[PLAYER_O],
    };
}

export default connect(mapStateToProps, null )(Scoreboard)