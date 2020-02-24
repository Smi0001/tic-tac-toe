
const X_TEXT = 'X'
const O_TEXT = 'O'
const WINNER_CLASS = 'winner-box'
const DEFAULT_POINTER_CLASS = 'cur-def'
const GAME_TIC_TAC_TOE = 'GAME_TIC_TAC_TOE'
const PLAYER_X = 'playerX'
const PLAYER_O = 'playerO'
const SCORE_X = 'scoreX'
const SCORE_O = 'scoreO'
const WINNER_TEXT = 'Winner: '
const CURRENT_PLAYER_TEXT = 'Current Player: '
const MATCH_DRAW_TEXT = 'Match is draw!'
const UPCOMING_FEATURE_TEXT = 'Coming Soon'
export const matrix = [
    null, null, null,
    null, null, null,
    null, null, null,
]
export const winnerBoxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
export const TEXT_CONSTANTS = {
    X_TEXT,
    O_TEXT,
    WINNER_CLASS,
    DEFAULT_POINTER_CLASS,
    GAME_TIC_TAC_TOE,
    PLAYER_X,
    PLAYER_O,
    SCORE_X,
    SCORE_O,
    WINNER_TEXT,
    CURRENT_PLAYER_TEXT,
    MATCH_DRAW_TEXT,
    UPCOMING_FEATURE_TEXT,
}
export const UPCOMING_FEATURE = [
    'Play Against CPU',
    'Share your score on social platforms',
    'Social platform Login',
    'Play with social platform friends',
    'Mobile App would be available soon',
]