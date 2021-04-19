import { settings } from "../config/settings.js";
import { getProperty } from "../config/userSettings.js";

/**
 * Get tickets of a month
 * @param {function} funct - The success function
 * @param {number} year  - The year
 * @param {number} month - The month
 */
export function getMonthTicketsService(funct, year, month) {
  let request = {
    token: getProperty('token'),
    auth: getProperty('auth'),
    content: {
      year: year,
      month: month,
    },
  };
  
  const url = settings().API + "?getMonthTickets=" + JSON.stringify(request);
  const method = { method: "GET" };

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.json();
      else return {
          success : 'false',
          error: '503'
      };
    })
    .then((json) =>funct(json))
    .catch(function (err) {
        return {
            error : err,
            type : 'Runtime error'
        }
    });
}

/**
 * Get all tickets of an auth
 * @param {Function} funct - The success function
 */
export function getAllTicketsService(funct) {
  let request = {
    token: getProperty('token'),
    auth: getProperty('auth')
  };
  
  const url = settings().API + "?getAllTickets=" + JSON.stringify(request);
  const method = { method: "GET" };

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.json();
      else return {
          success : 'false',
          error: '503'
      };
    })
    .then((json) => funct(json))
    .catch(function (err) {
        return {
            error : err,
            type : 'Runtime error'
        }
    });
}

