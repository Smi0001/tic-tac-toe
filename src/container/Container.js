import React from 'react'
import { connect } from 'react-redux';
import store from '../reduxStore'
import { bindActionCreators } from 'redux';
import { AppActions } from '../actions/index';
import Box from './Box'
import Scoreboard from './Scoreboard'
import { TEXT_CONSTANTS, matrix } from '../constants/constants'
import reloadIcon from '../assets/reload.svg'
import { UTILS } from '../utils/common-utils';
const {
    X_TEXT,
    WINNER_CLASS,
    // PLAYER_X,
    // PLAYER_O,
    DEFAULT_POINTER_CLASS,
    CURRENT_PLAYER_TEXT,
    // WINNER_TEXT,
    // MATCH_DRAW_TEXT,
} = TEXT_CONSTANTS
const STORE= [store]

function getCurrentStateFromStore() {
    let reduxStore = store.getState().reducers
    console.log('getCurrentStateFromStore', reduxStore)
    return {
        boxArray: reduxStore.boxArray,
        currentPlayer: reduxStore.currentPlayer,
        availableBoxCounter: reduxStore.availableBoxCounter,
        playerX: reduxStore.playerX,
        playerO: reduxStore.playerO,
        winnerBoxArray: reduxStore.winnerBoxArray,
        info: reduxStore.info,
    }
}

class Container extends React.Component {
    // state = this.getCurrentStateFromStore()
  
    constructor(props) {
        super(props, {
            store: STORE,
            getCurrentStateFromStore: getCurrentStateFromStore,
        })
        this.state = {
            boxArray: matrix.slice(),
            currentPlayer: X_TEXT,
            playerX: 0,
            playerO: 0,
            winnerBoxArray:[],
            info: CURRENT_PLAYER_TEXT,
            availableBoxCounter: 9,
        }
    }

    updateStateFromStore = () => {
        const currentState = getCurrentStateFromStore();
        
        if (this.state !== currentState) {
            console.log('updateStateFromStore', this.state, currentState)
            this.setState(currentState);
        }
    }
    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }
      
    componentWillUnmount() {
        this.unsubscribeStore();
    }

    reloadGame() {
        this.addRemoveClass('reset-btn', 'animated', true)
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
        this.addRemoveClass('reset-btn', 'animated', false)
    }
    callDeclareWinnerFn(winnerBoxIndex, winnerBoxArray) {
        UTILS.colorBox(winnerBoxArray, false)
        this.props.dispatch(
            AppActions.declareWinner({
                winnerBoxIndex,
                winnerBoxArray,
            })
        );
    }
    callCheckGameOver() {
        this.props.dispatch(
            AppActions.checkGameOver()
        )
        console.log('callCheckGameOver', this.state)
        
    }
    callBoxClickFn(boxIndex) {
        this.props.dispatch(
            AppActions.boxClick(boxIndex)
        )
        this.callCheckGameOver()
    }
    renderGrid() {
        const { boxArray, isGameOver, winnerBoxArray } = this.state
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
                    // disabledProp={ isGameOver ? true : null }
            )
        }
        return grid
    }

    render() {
        const { currentPlayer, playerX, playerO, info, isGameOver } = this.state
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

// export default Container
// function mapStateToProps(state){
//     console.log('state/dispatch', state, 'connect', connect)
//     return {
//         boxArray: state.boxArray,
//         currentPlayer: state.currentPlayer,
//         availableBoxCounter: state.availableBoxCounter,
//     };
// }

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            boxClick: bindActionCreators(AppActions.boxClick, dispatch),
            checkGameOver: bindActionCreators(AppActions.checkGameOver, dispatch),
            declareWinner: bindActionCreators(AppActions.declareWinner, dispatch),
        }
    }
}
export default connect( mapDispatchToProps )(Container)