import React from 'react'
import { connect } from 'react-redux';
import store from '../reduxStore'
import { AppActions, checkGameOver } from '../actions/index';
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS } from '../constants/constants'
import reloadIcon from '../assets/reload.svg'
import { UTILS } from '../utils/common-utils';
const {
    WINNER_CLASS,
    DEFAULT_POINTER_CLASS,
    CURRENT_PLAYER_TEXT,
} = TEXT_CONSTANTS


class Container extends React.Component {
  
    componentDidMount() {
        // this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    reloadGame() {
        UTILS.addRemoveClass('reset-btn', 'animated', true)
        // commenting as this triggers Scoreboard.UNSAFE_componentWillReceiveProps() and affects score
        // UTILS.colorBox(
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
        UTILS.addRemoveClass('reset-btn', 'animated', false)
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
        const { boxArray, isGameOver, winnerBoxArray } = this.props
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

    render() {
        const { currentPlayer, playerX, playerO, info, isGameOver } = this.props
        return (
            <div className="row">
                <div>
                    <div className="scoreboard">
                        <Scoreboard scores={ {playerX, playerO} } />
                    </div>
                    <div className="game-info">
                        {
                            isGameOver 
                        ?   <strong>{ info }</strong>
                        :   <strong>{ CURRENT_PLAYER_TEXT + currentPlayer }</strong>
                        }
                        <img id="reset-btn" alt="Reload" src={reloadIcon} className="reset-icon m-l-15pcnt" onClick={this.reloadGame.bind(this)} />
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
        checkGameOver: (newState) => {
            dispatch(AppActions.checkGameOver(newState))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Container)