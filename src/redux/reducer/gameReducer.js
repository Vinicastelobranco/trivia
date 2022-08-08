import { SAVE_TIMER } from '../actions/actionTypes';

const initialState = {
  timer: 30,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  default:
    return {
      ...state,
    };
  }
};

export default gameReducer;
