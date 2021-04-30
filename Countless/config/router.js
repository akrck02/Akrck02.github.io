import { homeView } from "../views/home/home.js";
import { ticketView } from "../views/tickets/tickets.js";
import { loginView } from "../views/login/login.js";
import { calendarView } from "../views/calendar/calendar.js";
import { configurationView } from "../views/configuration/configuration.js";
import { errorView } from "../views/errors/errors.js";
import { productView } from "../views/products/products.js";
import { eventView } from "../views/events/events.js";
import { settings } from "./settings.js";
import { isLogged } from "./userSettings.js";
import { analiticsView } from "../views/analitics/analitics.js";

/**
 * Paths of the application
 */
const PATHS = {
  home: (params) => show(homeView, params),
  tickets: (params) => show(ticketView, params),
  calendar: (params) => show(calendarView, params),
  analitics: (params) => show(analiticsView, params),
  events: (params) => show(eventView, params),
  products: (params) => show(productView, params),
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
    case "calendar":
      PATHS.calendar(params);
      break;
    case "events":
      PATHS.events(params);
      break;
    case "products":
      PATHS.products(params);
      break;
    case "analitics": 
      PATHS.analitics(params);
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
 * Load Quiet view
 * @param {*} params 
 */
export const loadQuiet = (params) =>  {
  load(params);
}

/**
 * Show a view
 * @param {view} view
 * @param {array} params
 */
const show = (view, params) => {
  try{
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
  }catch(error){
    console.error(error);
    location.href = settings().URL + "error/500";
  }
};

export const checkLogin = () => {
  if (isLogged() == false) {
    location.href = settings().URL + "login/";
  }
};


