import {
    TEXT_CONSTANTS,
    // matrix,
    // winnerBoxes
} from '../constants/constants'

const {
    // X_TEXT,
    // O_TEXT,
    WINNER_CLASS,
    // PLAYER_X,
    // PLAYER_O,
    // DEFAULT_POINTER_CLASS,
    // CURRENT_PLAYER_TEXT,
    // WINNER_TEXT,
    // MATCH_DRAW_TEXT,
} = TEXT_CONSTANTS

const addRemoveClass = ( elementId, className, isAdd) => {
    var boxElement = document.getElementById( elementId )
    boxElement
            ?
            isAdd ? boxElement.classList.add(className) : boxElement.classList.remove(className)
            :
            console.error(`Id ${elementId} is not available in DOM`)
}

const colorBox = (winnerBoxArray, isReset) => {
    for (var boxIndex = 0; boxIndex < winnerBoxArray.length; boxIndex++) {
        this.addRemoveClass(winnerBoxArray[boxIndex], WINNER_CLASS, !isReset)
    }
}
export const UTILS = {
    addRemoveClass,
    colorBox,
}