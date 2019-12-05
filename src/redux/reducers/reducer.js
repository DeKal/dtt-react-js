import { ActionTypes } from 'redux/actions/ActionTypes/';
import ApiService from 'service/ApiService';

const initialState = {
  data: [],
  login: {
    invalidLogin: "",
    showState: false,
    authenKey: "",
    userInfo: {
      budget: 0
    }
  },
  category: {
    data: {
      market: [],
      news: [],
      sports: [],
      games: []
    },
    extractedMenu: {
      market: [],
      news: [],
      sports: [],
      games: []
    },
    mapToParent: {}
  },
  bets: {
    data: [],
    loading: false
  },
  betStore: [],
  placedBetStore: [],
  errorMsg: "",
  userBet: {},
  historyBetStore: [],
  tabSelected: 0,
  recentBet: 0,
  promotionStore: [],
  sliders: [],
  right_banner: {}
};

export const fetchBanners = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BANNERS:
      return {
        ...state,
        sliders: action.payload.sliders,
        right_banner: action.payload.right_banner
      }
    default:
      return state;
  }
}

export const fetchPromotion = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROMOTION:
      return {
        ...state,
        promotionStore: action.payload
      }
    default:
      return state;
  }
}

export const listHistoryBetClick = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_HISTORY_BET_CLICK:
      return {
        ...state,
        tabSelected: action.tabSelected
      }
    default:
      return state;
  }
}

export const login = (state = initialState.login, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOGIN:
      return {
        ...state,
        showState: action.payload
      };
    case ActionTypes.LOGIN:
      state.invalidLogin = "";
      return {
        ...state,
        authenKey: action.payload
      }
    case ActionTypes.FETCH_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case ActionTypes.CLEAR_SID:
      return {
        ...state,
        authenKey: ""
      }
    case ActionTypes.INVALID_LOGIN:
      return {
        ...state,
        invalidLogin: action.payload
      }
    default:
      return state;
  }
}

export const betReducer = (state = initialState, action) => {
  const new_state = { ...state };
  switch (action.type) {
    case ActionTypes.RECORD_A_BET: {
      new_state.betStore = []
      new_state.betStore.unshift(action.bet);
      return new_state;
    }

    case ActionTypes.REMOVE_A_BET: {
      new_state.betStore = state.betStore.filter(bet => bet.id !== action.id)
      return new_state;
    }

    case ActionTypes.PLACE_BET: {
      new_state.errorMsg = "";
      Promise.all(
        state.betStore.map(async (bet) => {
          const data = await ApiService.submitBet(bet, action.authenKey);
          if (!ApiService.validate(data)) {
            new_state.errorMsg = new_state.errorMsg + "|" + bet.action + " " + bet.detail.categoryName + " " + bet.detail.type + ": " + data['err_msg'];
          }
          new_state.placedBetStore.push(bet)
        })
      ).then(() => {
        if (new_state.errorMsg)
          $("#errorModal").modal('show');
        return new_state;
      })
      new_state.betStore = [];
      return new_state;
    }

    case ActionTypes.UPDATE_BET: {
      new_state.betStore.forEach((bet) => {
        if (bet.id === action.updateBet.id) {
          bet.value = action.updateBet.value;
        }
      });
      return new_state;
    }

    case ActionTypes.FETCH_OPEN_BET: {
      new_state.placedBetStore = []
      action.payload['data'].map(openBet => {
        new_state.placedBetStore.push(ApiService.mapOpenBetToBet(openBet));
      });
      new_state.userBet = { ...action.payload['total_bet'] };
      new_state.recentBet = new_state.recentBet + action.payload['count_recent_bet'];
      return new_state;
    }

    case ActionTypes.FETCH_HISTORY_BET: {
      new_state.historyBetStore = []
      action.payload.map(historyBet => {
        new_state.historyBetStore.push(ApiService.mapOpenBetToBet(historyBet));
      });
      return new_state;
    }

    case ActionTypes.CLEAR_RECENT_BET: {
      new_state.recentBet = 0;
      return new_state;
    }
    default:
      return state;
  };
}

export const fetchCategory = (state = initialState.category, action) => {
  switch (action.type) {
    case ActionTypes.INIT_CATEGORY:
      const menu = {
        market: typeof action.payload.market !== "undefined" ? action.payload.market : [],
        news: typeof action.payload.news !== "undefined" ? action.payload.news : [],
        sports: typeof action.payload.sports !== "undefined" ? action.payload.sports : [],
        games: typeof action.payload.games !== "undefined" ? action.payload.games : []
      };

      return {
        ...state,
        data: menu,
        extractedMenu: ApiService.extractCategory(menu),
        mapToParent: ApiService.mapSubCategoryToParent(menu)
      };

    default:
      return state;
  }
}

export const fetchBet = (state = initialState.bets, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BET_BY_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case ActionTypes.UPDATE_BET_BY_SUB_CATEGORY: {
      const newState = { ...state };
      const subCategoryId = action.payload[0][0].id;
      let updatedKey = -1;
      newState.data.forEach((category, key) => {
        const updatedcategory = category.filter(bet => bet.id === subCategoryId)
        if (updatedcategory.length > 0) {
          updatedKey = key
        }
      });

      newState.data[updatedKey] = action.payload[0];
      newState.loading = false;
      return newState;
    }

    case ActionTypes.FETCH_HOME_DATA: {
      return {
        ...state,
        data: action.payload
      };
    }

    case ActionTypes.FETCH_BET_BY_CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return {
        ...state,
        loading: false
      }
  }
}
