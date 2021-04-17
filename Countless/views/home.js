import { bar } from "../components/bar.js";
import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";

/**
 * Show the home view
 * @param {array} params
 */
export const homeView = (params) => {
  const web_tittle = "Countless - Suite";
  window.title = web_tittle;
  document.title = web_tittle;

  const view = create({
    type: "view",
    classes: ["main", "box-column"],
    styles: {
      height: "100vh",
      width: "100vw",
    },
  });

  const titleBar = bar();
  const navBar = createNavbar();
  const notifications = createNotifications();

  titleBar.appendTo(view.element);
  navBar.appendTo(view.element);
  notifications.appendTo(view.element);

  view.appendTo(document.body);
};

const createNavbar = () => {
  const comp = create({
    type: "tabBar",
    classes: ["no_copy", "tab_bar", "box-row"],
    styles: {
      background: "transparent",
      border: "none",
    },
  });

  let n = 9;
  if(window.innerWidth < 900) 
    n = 5; 

  const home = create({
    type: "div",
    text: "Suite",
    id: "home",
    classes: ["tab", "center_text", "box-center", "selected"],
    styles: {
      width: "calc(100% / " + n + ")",
    },
  });

  const tickets = create({
    type: "div",
    text: "Tickets",
    id: "tickets",
    classes: ["tab", "center_text", "box-center"],
    styles: {
      width: "calc(100% /  " + n + ")",
    },
    events: {
      click: () => {
        location.href = settings().URL + "tickets/";
      },
    },
  });

  const calendar = create({
    type: "div",
    text: "Calendario",
    id: "calendar",
    classes: ["tab", "center_text", "box-center"],
    styles: {
      width: "calc(100% / " + n + ")",
    },
    events: {
      click: () => (location.href = settings().URL + "calendar/"),
    },
  });

  const reservations = create({
    type: "div",
    text: "Reservas",
    id: "reservations",
    classes: ["tab", "center_text", "box-center"],
    styles: {
      width: "calc(100% /  " + n + ")",
    },
    events: {
      click: () => (location.href = settings().URL + "reservation/"),
    },
  });

  const config = create({
    type: "div",
    text: "Configuración",
    id: "configuration",
    classes: ["tab", "center_text", "box-center"],
    styles: {
      width: "calc(100% /  " + n + ")",
    },
    events: {
      click: () => (location.href = settings().URL + "config/"),
    },
  });



  home.appendTo(comp.element);
  tickets.appendTo(comp.element);
  calendar.appendTo(comp.element);
  reservations.appendTo(comp.element);
  config.appendTo(comp.element);

  return comp;
};

const createNotifications = () => {
  const comp = create({
    type: "notifications",
    styles: {
      padding: "20px",
      "font-family": "Roboto thin",
    },
  });

  const titleBar = create({
    type: 'titleBar',
    classes : ['box-row']
  });

  const title = create({
    type: "h3",
    text: "Notificaciones",
    styles:{
      display: 'block',
      padding: '10px',
      margin : 0
    }
  });

  const notificationsIcon = create({
    type : 'img',
    options : {
      src : settings().ICONS + "notifications.svg"
    }
  });

  notificationsIcon.appendTo(titleBar.element);
  title.appendTo(titleBar.element);
  titleBar.appendTo(comp.element);


  return comp;
};
