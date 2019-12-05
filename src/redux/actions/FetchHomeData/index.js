import { ActionTypes } from 'redux/actions/ActionTypes';
import axios from 'axios';
import { HOME_MARKET_TYPE } from 'consts';
import ApiService from 'service/ApiService'

export const fetchHomeData = (categories) => async dispatch => {

  if (typeof categories === "undefined") return;

  let promises = [];
  try {
    if (categories.market.length > 0)
      promises = promises.concat(fetchHomeMarketData(categories));
    if (categories.news.length > 0)
      promises = promises.concat(fetchHomeNewsData(categories));
    if (categories.sports.length > 0)
      promises = promises.concat(fetchHomeSportsData(categories));
    if (categories.games.length > 0)
      promises = promises.concat(fetchHomeGamesData(categories));

    Promise.all(promises).then(function(bets) {
      let allBets = [];
      bets.map((bet) => {
        allBets = allBets.concat(bet)
      })
      return dispatch({
        type: ActionTypes.FETCH_BET_BY_CATEGORY,
        payload: ApiService.mapApiBetToBet(allBets)
      });
    });

    return dispatch({
      type: ActionTypes.FETCH_BET_BY_CATEGORY_LOADING
    });
  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
};

function fetchHomeMarketData(categories) {
  const marketCategory = ApiService.getCategoryFromMenu(categories, "market", "Commodities");
  const homeMarketSubCategories = getSubCategoriesFromCategory(marketCategory, ["Gold", "Silver"]);
  return fetchSubCategoriesData(marketCategory, homeMarketSubCategories);
}

function fetchHomeNewsData(categories) {
  const newsCategory = ApiService.getCategoryFromMenu(categories, "news", "Economy");
  return fetchNewsTypeData(newsCategory);
}

function fetchHomeSportsData(categories) {
  const sportsCategory = ApiService.getCategoryFromMenu(categories, "sports", "Premier League");
  return fetchNewsTypeData(sportsCategory);
}

function fetchHomeGamesData(categories) {
  const gameCategory = ApiService.getCategoryFromMenu(categories, "games", "Games");
  const homeGameSubCategories = getSubCategoriesFromCategory(gameCategory, ["Coins", "Numbers"]);
  return fetchSubCategoriesData(gameCategory, homeGameSubCategories);
}

function fetchSubCategoriesData(category, subCategories) {

  const promises = [];
  try {
    const categoryId = category.id;
    subCategories.map((subCategory) => {
      const subCategoryId = subCategory.id;
      promises.push(
        axios.get(`${ApiService.MARKET_API}?action=market.read&category_id=${categoryId}&id=${subCategoryId}`)
            .then(function(response) {
                if (ApiService.validate(response.data)){
                  return response.data.data
                }
                else {
                  return [];
                }
            })
      );
    });
  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
  return promises;
}

function fetchNewsTypeData(newsCategory) {
  const promises = [];
  try {
    const categoryId = newsCategory.id;
    promises.push(
      axios.get(`${ApiService.MARKET_API}?action=market.list&category_id=${categoryId}&range_start=0&range_end=1`)
          .then(function(response) {
              if (ApiService.validate(response.data)){
                return response.data.data
              }
              else {
                return [];
              }
          })
    );

  } catch ({ message }) {
      console.log(`Error fetching data: ${message}`);
  }
  return promises;
}

function getSubCategoriesFromCategory(marketCategory, subCategoryNames) {
  let subCategories = [];
  subCategoryNames.map((marketSubCategory) => {
    let filter_category = marketCategory.subcategories.filter(
      element => element.name.toLowerCase() === marketSubCategory.toLowerCase());
    subCategories = subCategories.concat(filter_category);
  })
  return subCategories;
}
