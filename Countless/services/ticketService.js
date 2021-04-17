import { settings } from "../config/settings.js";
import { getProperty } from "../config/userSettings.js";


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
    .then((json) => {
      funct(json);
    })
    .catch(function (err) {
        return {
            error : err,
            type : 'Runtime error'
        }
    });
}