import React from 'react'
import { connect } from 'react-redux';
import store from '../reduxStore'
import { AppActions, checkGameOver, reloadGame } from '../actions';
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS, UPCOMING_FEATURE } from '../constants/constants'
import reloadIcon from '../assets/reload.svg'
import { UTILS } from '../utils/common-utils'
const {
    WINNER_CLASS,
    DEFAULT_POINTER_CLASS,
    CURRENT_PLAYER_TEXT,
    MATCH_DRAW_TEXT,
    UPCOMING_FEATURE_TEXT,
} = TEXT_CONSTANTS


class Container extends React.Component {

    reloadGame() {
        store.dispatch(
            (dispatch, getState) => {
                reloadGame(dispatch, getState)
            }
        )
    }

    mountScoreBoard() {
        UTILS.delayedPromise(1).then(
            () =>
            store.dispatch(AppActions.mountScoreBoard())
        )
    }

    callBoxClickFn(boxIndex) {
        store.dispatch(
            (dispatch, getState) => {
                dispatch(AppActions.boxClick(boxIndex))
                checkGameOver(dispatch, getState)
            }
        )
    }

    renderGrid() {
        const { boxArray, isGameOver, winnerBoxArray, info } = this.props
        const grid = []
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            let alreadyClicked = boxArray[boxIndex] !== null
            let dynamicClasses = []
            dynamicClasses.push(
                info.indexOf(MATCH_DRAW_TEXT) > -1 || winnerBoxArray.includes(boxIndex)
                ? WINNER_CLASS : '' 
            )
            dynamicClasses.push(
                isGameOver || alreadyClicked
                ? DEFAULT_POINTER_CLASS : '' 
            )
            grid.push(
                <Box
                    key={ boxIndex }
                    overridingClass={ dynamicClasses.join(" ") }
                    boxIndex={ boxIndex }
                    value={ boxArray[boxIndex] }
                    onClick={
                        isGameOver || alreadyClicked
                        ?
                            null
                        : this.callBoxClickFn.bind(this, boxIndex)
                    }
                />
            )
        }
        return grid
    }

    renderUpcomingFeatures() {
        return (
            <div className="upcoming-feature-div">
                <label>{UPCOMING_FEATURE_TEXT}</label>
                <ul className="upcoming-feature-list">
                    {
                        UPCOMING_FEATURE.map( (feature, index) => <li key={index}>-- {feature}</li>)
                    }
                </ul>
            </div>
        )
    }

    render() {
        const { currentPlayer, info, isGameOver, reloadScores } = this.props
        return (
            <div className="row">
                <div>{ this.renderUpcomingFeatures() }</div>
                <div>
                    <div className="scoreboard">
                        {!reloadScores ? <Scoreboard /> : this.mountScoreBoard()}
                    </div>
                    <div className="game-info">
                        {
                            isGameOver
                            ?   <strong>{ info }</strong>
                            :   <strong>{ CURRENT_PLAYER_TEXT + currentPlayer }</strong>
                        }
                        <img id="reset-btn" alt="Reload" src={reloadIcon} className="reset-icon m-l-15pcnt" onClick={this.reloadGame.bind(this)} title="Reset Game" />
                    </div>
                </div>
                <div className={"container container-3-col"}>
                    { this.renderGrid() }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        boxArray: state.reducerState.boxArray,
        currentPlayer: state.reducerState.currentPlayer,
        availableBoxCounter: state.reducerState.availableBoxCounter,
        winnerBoxArray: state.reducerState.winnerBoxArray,
        info: state.reducerState.info,
        isGameOver: state.reducerState.isGameOver,
        playerO: state.reducerState.playerO,
        playerX: state.reducerState.playerX,
        reloadScores: state.reducerState.reloadScores,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        boxClick: boxIndex => {
            dispatch(AppActions.boxClick(boxIndex))
        },
        setGameOver: (isTrue, text) =>{
            dispatch(AppActions.setGameOver(isTrue, text))
        },
        declareWinner: (winnerBoxIndex, winnerBoxArray) => {
            dispatch(AppActions.declareWinner(winnerBoxIndex, winnerBoxArray))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Container)