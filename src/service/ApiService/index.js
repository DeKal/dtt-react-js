import qs from 'qs';
import axios from 'axios';
import { BET_TYPE, BET_UP_ACTION, BET_DOWN_ACTION } from 'consts';
import { Utils } from 'utils';
export default class ApiService {
  static BASE_API_URL = "//api.liveguess.net/api/v1/";
  static LOGIN_API = `${ApiService.BASE_API_URL}user/`;
  static MARKET_API = `${ApiService.BASE_API_URL}market/`;

  static validate(data) {
    return typeof data !== "undefined" && data.result;
  }

  static convertLoginInfoToApiInfo = (info) => {
    return qs.stringify({
      email: info.userName,
      password: info.password,
      action: "user.login"
    })
  }

  /* Input: the path from URL. E.g: Market/Commodities
   * Output: read from store state to get sub categories list
   */
  static getSubCategoryFromMenu = (categoryStore, categoryType, category) => {
    if (typeof categoryType === "undefined") return [];

    categoryType = categoryType.toLowerCase();
    let targetCategory = categoryStore[categoryType];
    if (typeof category !== "undefined") {
      category = category.toLowerCase();
      let filter_category = targetCategory.filter(element => element.name.toLowerCase() === category);
      // Sanity check, only one matched category
      if (filter_category.length === 1) {
        targetCategory = filter_category[0].subcategories;
      }
    }

    if (typeof targetCategory === 'undefined') {
      console.warn("Could not find categoryType " + categoryType)
      return [];
    }
    return targetCategory;
  }

  static getCategoryIdFromMenu = (categoryStore, categoryType, category) => {
    if (typeof categoryType === "undefined") return;
    if (typeof category !== "undefined") {
      categoryType = categoryType.toLowerCase();
      let targetCategory = categoryStore[categoryType];
      category = category.toLowerCase();
      let filter_category = targetCategory.filter(element => element.name.toLowerCase() === category);
      // Sanity check, only one matched category
      if (filter_category.length === 1) {
        targetCategory = filter_category[0];
        return targetCategory.id;
      }
    }
    return;
  }

  static getCategoryFromMenu = (categoryStore, categoryType, category) => {
    if (typeof categoryType === "undefined") return;
    if (typeof category !== "undefined") {
      categoryType = categoryType.toLowerCase();
      let targetCategory = categoryStore[categoryType];
      category = category.toLowerCase();
      let filter_category = targetCategory.filter(element => element.name.toLowerCase() === category);
      // Sanity check, only one matched category
      if (filter_category.length === 1) {
        targetCategory = filter_category[0];
        return targetCategory;
      }
    }
    return;
  }

  static getSubCategoryIdFromMenu = (categoryStore, categoryType, category, subCategory) => {
    if (typeof categoryType === 'undefined'
      || typeof category === 'undefined'
      || typeof subCategory === 'undefined') {
      return;
    }
    categoryType = categoryType.toLowerCase();
    category = category.toLowerCase();
    subCategory = subCategory.toLowerCase();

    let targetCategory = categoryStore[categoryType];
    let filter_category = targetCategory.filter(element => element.name.toLowerCase() === category);
    // Sanity check, only one matched category
    if (filter_category.length === 1) {
      targetCategory = filter_category[0];
      let filter_subCategory = targetCategory.subcategories.filter(element => element.name.toLowerCase() === subCategory.replace('-', '/'));
      // Sanity check, only one matched category
      if (filter_subCategory.length === 1) {
        return filter_subCategory[0].id
      }
    }
    return;
  }

  static checkBet = async (bet_id, authenKey) => {
    if(authenKey === "")
      return 0;
    const res = await axios.post(`${ApiService.MARKET_API}?action=market.betcheck&sid=${authenKey}&bet_id=${bet_id}`)
    const { data } = res;
    if (data.result === true) {
      return data.data.result;
    }
    return 0;
  }

  static mapApiBetToBet = (data) => {
    const tableArray = [];
    if(data.constructor !== Array )
      return [];
    data.forEach(table => {
      const timeArray = [];
      if (typeof table.gamestat === "undefined") return;

      table.gamestat.forEach((game) => {
        let result = {};
        if (table.game_type === BET_TYPE.MARKET) {
          result = ApiService.mapApiBetToMarketBet(table, game);
        }
        else {
          result = ApiService.mapApiBetToNewsBet(table, game);
        }
        timeArray.push(result);
      })
      tableArray.push(timeArray);
    })
    return tableArray;
  }

  static mapApiBetToMarketBet = (table, game) => {
    return {
      "id": table.id,
      "categoryId": table.category_id,
      "categoryName": table.name,
      "betType": table.game_type,
      "chartLink": table.chart_link,
      "current": game.last,
      "guess": game.guess,
      "duration": parseInt(game.second),
      "type": game.type,
      "timeEnd": game.game_start + parseInt(game.second),
      "timeResult": game.time_result,
      "oddUp": game.odd_up,
      "oddUnder": game.odd_down,
      "totalUp": game.total_bet_up,
      "totalUnder": game.total_bet_down,
      "totalRefund": game.total_bet_refund,
      "gameStart": game.game_start,
      "historyBet": game.historybet,
      "currentBet": game.currentbet,
      "timeWait": game.time_wait,
      "status": game.status,
      "upText": table.up_text,
      "downText": table.down_text
    }
  }

  static mapApiBetToNewsBet = (table, game) => {
    return {
      "id": table.id,
      "categoryId": table.category_id,
      "categoryName": table.name,
      "betType": table.game_type,
      "current": game.last,
      "guess": game.guess,
      "duration": parseInt(game.second),
      "type": game.type,
      "timeEnd": game.game_start + parseInt(game.second),
      "oddUp": game.odd_up,
      "oddUnder": game.odd_down,
      "totalUp": game.total_bet_up,
      "totalUnder": game.total_bet_down,
      "gameStart": game.game_start,
      "historyBet": game.historybet,
      "currentBet": game.currentbet,
      "timeWait": game.time_wait,
      "status": game.status,
      "betTitle": table.HEADLINE,
      "betDesc": table.BODY,
      "betQuestion": game.question,
      "betAuthor": (table.news_provider_name) ? table.news_provider_name + " - " + table.last_updated : "",
      "newsLink": table.news_link,
      "betImage": table.related_image_big,
      "upText": table.up_text,
      "downText": table.down_text
    }
  }

  static mapOpenBetToBet = (data) => {
    const result = {
      detail: {
        "type": data.type,
        "categoryName": data.market_name
      },
      action: parseFloat(data.bet_down) !== 0 ? ApiService.getGuessNo(data.game_type, data.market_name) : ApiService.getGuessYes(data.game_type, data.market_name),
      ratio: parseFloat(data.bet_down) !== 0 ? data.odd_down : data.odd_up,
      id: data.bet_id,
      value: parseInt(data.bet_down) + parseInt(data.bet_up),
      status: data.status,
      winBet: ApiService.calculateWinBet(data),
      gameEnd: Utils.formatDateFromTime(Number(data.last_timestamp)),
      guess: data.guess,
      last: parseFloat(data.last),
      result: parseFloat(data.last) === 0 ? ApiService.getGuessNo(data.game_type, data.market_name) : ApiService.getGuessYes(data.game_type, data.market_name)
    }
    return result;
  }

  static getGuessNo(game_type, market_name) {
    if(game_type === "news" || game_type == "sports")
      return "No"
    else if (game_type === "games") {
      if(market_name === "Numbers")
        return "0-50"
      return "Images"
    }
    return "Lower"
  }

  static getGuessYes(game_type, market_name) {
    if(game_type === "news" || game_type === "sports")
      return "Yes"
    else if (game_type === "games") {
      if(market_name === "Numbers")
        return "51-100"
      return "Numbers"
    }
    return "Higher"
  }

  static calculateWinBet(data) {
    const result = parseFloat(data.budget) - (parseFloat(data.budget_before_bet) + parseFloat(data.bet_up) + parseFloat(data.bet_down))
    return result.toFixed(2)
  }

  static submitBet = async (bet, authenKey) => {
    let bet_up = 0, bet_down = 0;
    if (BET_UP_ACTION[bet.action]) {
      bet_up = bet.value;
    } else if (BET_DOWN_ACTION[bet.action]) {
      bet_down = bet.value;
    }
    const res = await axios.post(`${ApiService.MARKET_API}`,
      qs.stringify({
        'action': 'market.bet',
        'second': bet.detail.duration,
        'bet_up': bet_up,
        'bet_down': bet_down,
        'sid': authenKey,
        'id': bet.detail.id
      })

    );
    const { data } = res;
    return data;
  }

  static filterBetByCategory = (state) => {
    const dataMap = new Map();
    if (state.data.constructor !== Array) return dataMap;
    state.data.forEach((betItem) => {
      if(betItem.length > 0) {
        let id = betItem[0].id;
        let listItem = dataMap.get(id);
        listItem = (typeof listItem === 'undefined') ? new Array() : listItem;
        betItem.forEach(timeItem => {
          listItem.push(timeItem);
        })
        dataMap.set(id, listItem);
      }
    });
    return dataMap;
  }

  static mapSubCategoryToParent = (categoryTypes) => {
    const map = new Map();
    for (let categoryTypeName in categoryTypes) {
      const categories = categoryTypes[categoryTypeName];
      categories.map(category => {
        const subCategories = category.subcategories;
        map.set(category.name, categoryTypeName);
        if (subCategories.constructor === Array) {
          subCategories.map(subCategory => {
            map.set(subCategory.name, category.name);
          })
        }
      })
    }
    return map;
  }

  static extractSubCategory = (mainCategory) => {
    if (typeof mainCategory === "undefined" || typeof mainCategory === "boolean") return;
    let newCategoriesArr = [];
    mainCategory.map((categoryItem) => {
      if (categoryItem.subcategories.constructor === Array) {
        newCategoriesArr = newCategoriesArr.concat(categoryItem.subcategories);
      }
      else {
        newCategoriesArr = newCategoriesArr.concat(categoryItem);
      }

    })
    return newCategoriesArr;
  }

  static extractCategory = (category) => {
    const drawerCategory = {};

    for (let mainCategoryName in category) {
      drawerCategory[mainCategoryName] = ApiService.extractSubCategory(category[mainCategoryName])
    }
    return drawerCategory;
  };
}
