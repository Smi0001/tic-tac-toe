import * as actionType from '../actions/ActionType';
import {
    TEXT_CONSTANTS,
    matrix,
} from '../constants/constants'
import { UTILS } from '../utils/common-utils';

const {
    X_TEXT,
    O_TEXT,
    PLAYER_X,
    PLAYER_O,
    CURRENT_PLAYER_TEXT,
    WINNER_TEXT,
} = TEXT_CONSTANTS

const initialState = {
    boxArray: matrix.slice(),
    currentPlayer: X_TEXT,
    playerX: 0,
    playerO: 0,
    winnerBoxArray:[],
    info: CURRENT_PLAYER_TEXT,
    availableBoxCounter: 9,
    isGameOver: false,
    reloadScores: null,
}


const reducerState = (prevState = {}, action) => {
    const {
        boxArray,
        currentPlayer,
        availableBoxCounter,
        playerX,
        playerO,
    } = prevState

    switch (action.type) {

        case actionType.BOX_CLICK:
            let {
              boxIndex,
            } = action.payload
      
            let boxArrayCopy = boxArray.slice()
            boxArrayCopy[boxIndex] = currentPlayer
            return  {
                ...prevState,
                boxArray: boxArrayCopy,
                currentPlayer: currentPlayer === X_TEXT ? O_TEXT : X_TEXT,
                availableBoxCounter: availableBoxCounter - 1,
            }

        case actionType.DECLARE_WINNER:
            let {
                winnerBoxIndex,
                winnerBoxArray,
            } = action.payload
            UTILS.colorBox(winnerBoxArray, false)
            const winnerPlayer = prevState.boxArray[winnerBoxIndex]
            let winner = {}
            if (winnerPlayer === X_TEXT) {
                winner = { [PLAYER_X]: playerX + 1 }
            } else {
                winner = { [PLAYER_O]: playerO + 1 }
            }
            return {
                ...prevState,
                ...winner, // should update Scoreboard.js
                isGameOver: true,
                winnerBoxArray,
                info: WINNER_TEXT + winnerPlayer,
            }

        case actionType.SET_GAME_OVER:
            let { isGameOver, info } = action.payload
            return {
                ...prevState,
                isGameOver,
                info,
            }

        case actionType.RELOAD_GAME:
            return {
                ...prevState,
                ...initialState,                
                reloadScores: true,
            }

        case actionType.MOUNT_SCORE_BOARD:
            return {
                ...prevState,
                reloadScores: null,
            }
        default:
            return {...initialState}
    }
}

export default reducerState;