import * as actionType from './ActionType';

export const AppActions = {

  boxClick: (boxIndex) => {
    return ({
        type: actionType.BOX_CLICK,
        payload: {boxIndex}
    })
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

  checkGameOver: () => {
    return ({
      type: actionType.CHECK_GAME_OVER,
      payload: {}
    })
  },

}