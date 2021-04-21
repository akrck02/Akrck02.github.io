import { settings } from "../config/settings.js";
import { getProperty } from "../config/userSettings.js";
import { fetchJSON } from "../lib/GTD_EasyFetch.js";

/**
 * Get tickets of a month
 * @param {function} funct - The success function
 * @param {number} year  - The year
 * @param {number} month - The month
 */
export function getMonthTicketsService(funct, year, month) {
  let request = {
    token: getProperty("token"),
    auth: getProperty("auth"),
    content: {
      year: year,
      month: month,
    },
  };

  fetchJSON({
    url: settings().API + "?getMonthTickets=" + JSON.stringify(request),
    request: request,
    method: "GET",
    success: (json) => funct(json),
    fail: (fail) => console.log("[Fail] : " + fail),
    error: (error) => console.log("[Error] : " + error),
  });
}

/**
 * Get all tickets of an auth
 * @param {Function} funct - The success function
 */
export function getAllTicketsService(funct) {
  let request = {
    token: getProperty("token"),
    auth: getProperty("auth"),
  };

  fetchJSON({
    url: settings().API + "?getAllTickets=" + JSON.stringify(request),
    request: request,
    method: "GET",
    success: (json) => funct(json),
    fail: (json) => console.log("[Fail] : " + json),
    error: (err) => console.log("[Error] : " + err),
  });
}
