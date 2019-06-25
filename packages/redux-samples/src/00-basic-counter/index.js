import {createStore} from 'redux';

/**
 * The reducer, modifies the state (number)
 * based on the given action "type".
 * @param {number} state 
 * @param {{type: string}} action 
 */
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

/**
 * The store, there is only 1 store, it is
 * the source of truth.
 * Actions are "dispatch(ed)" to the store
 * to modify its state.
 */
const store = createStore(counter);

/**
 * A consumer of the store. "Subscribe(rs)" are
 * called when the state of the store changes.
 */
store.subscribe(() => console.log(store.getState()));


/**
 * Example action dispatches.
 * Note the print out of the store state after each
 * dispatch.
 */
store.dispatch({ type: 'INCREMENT'});
// 1
store.dispatch({ type: 'INCREMENT'});
// 2
store.dispatch({ type: 'DECREMENT'});
// 1
store.dispatch({ type: 'SOMEOTHEREVENT'});
// 1