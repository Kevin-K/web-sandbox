import {createStore, combineReducers} from 'redux';

export const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

export const toggle = (state = true, action) => {
    switch(action.type) {
        case 'TOGGLE':
            return !state;
        default:
            return state;
    }
};




/**
 * Redux provided solution:
 * Use redux combine reducers to have multiple actions
 * impact the store.
 */
const reducers = combineReducers({
    toggle,
    counter
});

const store = createStore(reducers);
/**
 * How does combineReducers work? Lets rebuild it from scratch.
 * It takes an object of reducers, and returns a single reducer
 * that will iterate through each reducer and apply the action to it
 * and accumulate all state changes.
 */
const myCombineReducers = (reducers) => {
    // a reducer function (given state, and action return state);
    return (state = {}, action) => {
        // itterate over all reducers
        return Object.keys(reducers)
            // and accumulate a state object, by giving each
            // reducer its state value and the action
            .reduce((nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            }, {});
    };
};

const myReducers = myCombineReducers({
    toggle,
    counter
});
const myStore = createStore(myReducers);

console.log("Redux combineReducer:");
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'TOGGLE'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'DECREMENT'});
store.dispatch({ type: 'TOGGLE'});

console.log("Reimplemented combineReducer:");
myStore.subscribe(() => console.log(myStore.getState()));
myStore.dispatch({ type: 'TOGGLE'});
myStore.dispatch({ type: 'INCREMENT'});
myStore.dispatch({ type: 'DECREMENT'});
myStore.dispatch({ type: 'TOGGLE'});