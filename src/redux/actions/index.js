import {
  SAVE_LOGIN_INFO, ADD_SCORE, SAVE_TIMER, RESET_PLAYER, CHANGE_SETTINGS,
} from './actionTypes';

export const saveLoginInfoAction = (loginInfoObj) => ({
  type: SAVE_LOGIN_INFO,
  loginInfoObj,
});

export const addScoreAction = (score) => ({
  type: ADD_SCORE,
  score,
});

export const saveTimerAction = (timer) => ({
  type: SAVE_TIMER,
  timer,
});

export const resetPlayerAction = () => ({
  type: RESET_PLAYER,
});

export const changeSettingsAction = (category, difficulty, questionType) => ({
  type: CHANGE_SETTINGS,
  category,
  difficulty,
  questionType,
});
