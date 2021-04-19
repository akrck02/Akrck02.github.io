import { homeView } from "../views/home.js";
import { ticketView } from "../views/tickets.js";
import { countView } from "../views/count.js";
import { loginView } from "../views/login.js";
import { calendarView } from "../views/calendar.js";
import { configurationView } from "../views/configuration.js";
import { errorView } from "../views/errors.js";
import { settings } from "./settings.js";
import { isLogged } from "./userSettings.js";
import { reservationView } from "../views/reservations.js";

/**
 * Paths of the application
 */
const PATHS = {
  home: (params) => show(homeView, params),
  tickets: (params) => show(ticketView, params),
  count: (params) => show(countView, params),
  calendar: (params) => show(calendarView, params),
  reservations: (params) => show(reservationView, params),
  config: (params) => show(configurationView, params),
  login: (params) => show(loginView, params),
  errors: (params) => show(errorView, params),
};

/**
 * Load a view
 * @param {array} params
 */
export const load = (params) => {
  switch (params[0]) {
    case "home":
      PATHS.home(params);
      break;
    case "tickets":
      PATHS.tickets(params);
      break;
    case "count":
      PATHS.count(params);
      break;
    case "calendar":
      PATHS.calendar(params);
      break;
    case "reservations":
      PATHS.reservations(params);
      break;
    case "config":
      PATHS.config(params);
      break;

    case undefined:
    case "":
    case "login":
      PATHS.login(params);
      break;
    case "error":
      PATHS.errors(params);
      break;
    default:
      location = settings().URL + "error/404/";
  }
};

/**
 * Show a view
 * @param {view} view
 * @param {array} params
 */
const show = (view, params) => {
  document.body.style.transition = "0s";
  document.body.style.opacity = "0";
  document.body.style.top = "-5vw";

  if (view == loginView || view == errorView) {
    document.body.innerHTML = "";
    view(params);
  } else {
    checkLogin();
    document.body.innerHTML = "";
    view(params);
  }
  setTimeout(() => {
    document.body.style.transition = ".5s";
    document.body.style.top = "0";
    document.body.style.opacity = "1";
  }, 150);
};

export const checkLogin = () => {
  if (isLogged() == false) {
    location.href = settings().URL + "login/";
  }
};


