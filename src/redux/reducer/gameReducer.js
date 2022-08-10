import { SAVE_TIMER, CHANGE_SETTINGS } from '../actions/actionTypes';

const initialState = {
  timer: 30,
  category: '',
  difficulty: '',
  questionType: '',
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  case CHANGE_SETTINGS:
    return {
      ...state,
      category: action.category,
      difficulty: action.difficulty,
      questionType: action.questionType,
    };
  default:
    return {
      ...state,
    };
  }
};

export default gameReducer;
