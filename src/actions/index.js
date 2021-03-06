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

  reloadGame: () => {
    return {
      type: actionType.RELOAD_GAME,
    }
  },

  mountScoreBoard: () => {
    return {
      type: actionType.MOUNT_SCORE_BOARD,
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
    if (availableBoxCounter === 0) {
        dispatch(AppActions.setGameOver(true, TEXT_CONSTANTS.MATCH_DRAW_TEXT))
        UTILS.colorBox(winnerBoxes[0])
        UTILS.colorBox(winnerBoxes[1])
        UTILS.colorBox(winnerBoxes[2])
    }
}

export const reloadGame = (dispatch, getState) => {
    UTILS.addRemoveClass('reset-btn', 'animated', true)
    let { winnerBoxArray } = getState().reducerState
    UTILS.colorBox(
        winnerBoxArray,
        true
    )
    dispatch(AppActions.reloadGame())
    UTILS.addRemoveClass('reset-btn', 'animated', false)
}