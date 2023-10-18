import {createStore} from 'redux';

const reducer = (state = { counter: 0},  action) => {
  // sync function
  // should not mutate the original state
  if(action.type === "inc") {
    return {counter: state.counter + 1}
  }

  if(action.type === "dec") {
    return {counter: state.counter - 1}
  }

  if(action.type === "addBy") {
    return {counter: state.counter + action.payload}
  }

  return state; // return {counter :0}
}

const store = createStore(reducer);
export default store;
