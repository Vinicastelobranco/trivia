import { SAVE_LOGIN_INFO, ADD_SCORE, RESET_PLAYER } from '../actions/actionTypes';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_LOGIN_INFO:
    return {
      ...state,
      name: action.loginInfoObj.name,
      gravatarEmail: action.loginInfoObj.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case RESET_PLAYER:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return {
      ...state,
    };
  }
};

export default playerReducer;
