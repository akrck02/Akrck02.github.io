import { settings } from "../config/settings.js";
import { lastday } from "./monthCalc.js";


/**
 * fill JSON object with 5 year drafts
 * @param {*} json - The json containing all drafts
 * @param {*} year - The last year
 * @returns json object 
 */
export const fillJsonWithDrafts = (json, year) => {
  for (let current_year = year - 5; current_year <= year; current_year++) {
    if (json[current_year] == undefined) json[current_year] = {};

    for (let current_month = 0; current_month < 12; current_month++) {
      if (json[current_year][current_month] == undefined)
        json[current_year][current_month] = generateDraft(current_year, current_month);
    }
  }
  return json;
};



/**
 * Generate empty month draft
 * @param {*} y - The year
 * @param {*} m - The month
 * @returns The month's draft
 */
 export const generateDraft = (y, m) => {
    const draft = {
      month: m,
      year: y,
      company: settings().COMPANY,
      lastID: 0,
      info: {},
      total: '0.00',
    };
  
    const last = lastday(y, m);
    for (let i = 1; i <= last; i++) {
      draft.info[i] = {};
      draft.info[i].id = {};
      draft.info[i].number = 0;
      draft.info[i].price = 0;
    }
  
    return draft;
  };
  