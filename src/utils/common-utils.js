import {
    TEXT_CONSTANTS,
} from '../constants/constants'

const {
    WINNER_CLASS,
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
        addRemoveClass(winnerBoxArray[boxIndex], WINNER_CLASS, !isReset)
    }
}

const delayedPromise = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
)

export const UTILS = {
    addRemoveClass,
    colorBox,
    delayedPromise,
}