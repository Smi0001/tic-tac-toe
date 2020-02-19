import * as actionType from './ActionType';
import { UTILS } from '../utils/common-utils';
import {
  TEXT_CONSTANTS,
  winnerBoxes
} from '../constants/constants'

export const AppActions = {

  boxClick: (boxIndex) => {
    return {
      type: actionType.BOX_CLICK,
      payload: {boxIndex}
    }
  },

  declareWinner: (winnerBoxIndex, winnerBoxArray) => {
    return ({
      type: actionType.DECLARE_WINNER,
      payload: {
        winnerBoxIndex,
        winnerBoxArray,
      }
    })
  },

  setGameOver: (isGameOver, info) => {
    return {
      type: actionType.SET_GAME_OVER,
      payload: {
        isGameOver,
        info
      }
    }
  },

}

export const checkGameOver = (dispatch, getState) => {
    const { boxArray, isGameOver, availableBoxCounter } =  getState().reducerState

    let rowIndex
    for (rowIndex = 0; rowIndex < winnerBoxes.length; rowIndex++) {
        const [a, b, c] = winnerBoxes[rowIndex];
        if (!isGameOver && boxArray[a] && boxArray[a] === boxArray[b] && boxArray[a] === boxArray[c]) {
            dispatch(
                AppActions.declareWinner(
                  a,
                  [a, b, c]
                )
            )
            return false
        }
    }
    // when no available box is available this snippet executes only when callDeclareWinnerFn() is not called
    if (availableBoxCounter === 0) {
        dispatch(AppActions.setGameOver(true, TEXT_CONSTANTS.MATCH_DRAW_TEXT))
        UTILS.colorBox(winnerBoxes[0])
        UTILS.colorBox(winnerBoxes[1])
        UTILS.colorBox(winnerBoxes[2])
    }
}