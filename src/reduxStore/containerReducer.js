import * as actionType from '../actions/ActionType';
import {
    TEXT_CONSTANTS,
    matrix,
    winnerBoxes
} from '../constants/constants'
import store from '.';
import { AppActions } from '../actions';
import { UTILS } from '../utils/common-utils';

const {
    X_TEXT,
    O_TEXT,
    // WINNER_CLASS,
    PLAYER_X,
    PLAYER_O,
    // DEFAULT_POINTER_CLASS,
    CURRENT_PLAYER_TEXT,
    WINNER_TEXT,
    MATCH_DRAW_TEXT,
} = TEXT_CONSTANTS

const initialState = {
    boxArray: matrix.slice(),
    currentPlayer: X_TEXT,
    playerX: 0,
    playerO: 0,
    winnerBoxArray:[],
    info: CURRENT_PLAYER_TEXT,
    availableBoxCounter: 9,
}
const reducers = (state = {...initialState}, action) => {
    let newState;
    const {
        boxArray,
        currentPlayer,
        availableBoxCounter,
        playerX,
        playerO,
        isGameOver,
    } = state

    switch (action.type) {
        case actionType.BOX_CLICK:
            let {
              boxIndex,
            } = action.payload
      
            let boxArrayCopy = boxArray.slice()
            boxArrayCopy[boxIndex] = currentPlayer
            newState = {
                boxArray: boxArrayCopy,
                currentPlayer: currentPlayer === X_TEXT ? O_TEXT : X_TEXT,
                availableBoxCounter: availableBoxCounter - 1,
            }
            return {...newState}

        case actionType.DECLARE_WINNER:
            let {
              winnerBoxIndex,
              winnerBoxArray,
            } = action.payload
    
            let winner = {}
            if (boxArray[winnerBoxIndex] === X_TEXT) {
                winner = { [PLAYER_X]: playerX + 1 }
            } else {
                winner = { [PLAYER_O]: playerO + 1 }
            }
            newState = {
                isGameOver: true,
                ...winner,
                winnerBoxArray,
                info: WINNER_TEXT + boxArray[winnerBoxIndex],
            }
            return {...newState}

        case actionType.CHECK_GAME_OVER:
            let rowIndex
            for (rowIndex = 0; rowIndex < winnerBoxes.length; rowIndex++) {
                const [a, b, c] = winnerBoxes[rowIndex];
                if (!isGameOver && boxArray[a] && boxArray[a] === boxArray[b] && boxArray[a] === boxArray[c]) {
                    store.dispatch(
                        AppActions.declareWinner(
                          a,
                          [a, b, c]
                        )
                    )
                    // return false
                    break;
                }
            }
            // when no available box is available this snippet executes only when callDeclareWinnerFn() is not called
            if (availableBoxCounter === 0) { 
                newState = {
                    isGameOver: true,
                    info: MATCH_DRAW_TEXT,
                }
                UTILS.colorBox(winnerBoxes[0])
                UTILS.colorBox(winnerBoxes[1])
                UTILS.colorBox(winnerBoxes[2])
            }
            return {...newState}
        default:
          console.log('default', state)
          return state
    }
}

export default reducers;