import { combineReducers } from 'redux';

import { localizeReducer } from "react-localize-redux";

import {
  login,
  betReducer,
  fetchCategory,
  listHistoryBetClick,
  fetchBet,
  fetchPromotion,
  fetchBanners
} from './reducer';

export default combineReducers({
  login,
  betReducer,
  fetchCategory,
  listHistoryBetClick,
  fetchBet,
  fetchPromotion,
  fetchBanners,
  localize: localizeReducer
});
