import { bar } from "../components/bar.js";
import { configBar } from "../components/configBar.js";
import { settings } from "../config/settings.js";
import { destroy } from "../config/userSettings.js";
import { create } from "../lib/GTD_Component.js";
import { isEmpty } from "../lib/GTD_DataTools.js";

/**
 * Show the calendar view
 * @param {array} params
 */
export const configurationView = (params) => {
  const web_tittle = "Countless - Configuración";
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

  const titleBar = bar("Configuración");
  const cfgBar = configBar();

  const config = create({
    type: "config",
    styles: {
      padding: "20px",
    },
  });

  titleBar.appendTo(view.element);
  cfgBar.appendTo(view.element);
  config.appendTo(view.element);
  view.appendTo(document.body);
  createUserConfig();
};

/**
 * Create user configuration
 * @param {*} view - The view
 */
export const createUserConfig = () => {

  const view = document.querySelector("config");
  if (isEmpty(view)) return;

  view.innerHTML = "";
  const exit = create({
    type: "exitbutton",
    classes: ["box-y-center"],
    styles: {
      padding: "10px",
      width: "100px",
      cursor: "pointer",
    },
    events: {
      click: () => destroy(),
    },
  });

  const exitIcon = create({
    type: "img",
    options: {
      src: settings().ICONS + "logout.svg",
      alt: "logout",
    },
  });

  const exitMsg = create({
    type: "msg",
    text: "Salir",
    styles: {
      padding: "5px",
    },
  });

  exitIcon.appendTo(exit.element);
  exitMsg.appendTo(exit.element);
  exit.appendTo(view);
};

export const createTicketsConfig = () => {
  const view = document.querySelector("config");
  if (isEmpty(view)) return;

  view.innerHTML = "";

  const title = create({
    type: "text",
    text: "Número inicio: ",
    styles : {
      'margin-right' : '10px'
    }
  });

  const startNumber = create({
    type: 'input',
    styles : {
      border: '1px solid rgba(0,0,0,.1)',
      padding: '6px'
    },
    options :{
      type : 'number',
      value: 0,
      min : 0
    }
  });

  title.appendTo(view);
  startNumber.appendTo(view);
};

export const changeSelectedTab = (index) => {
  const tabs = document.querySelectorAll(".tab_bar .tab");
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    if (i != index) {
      tab.className = "";
      tab.classList.add("tab");
      tab.classList.add("center_text");
      tab.classList.add("box-center");
    }else{
      tab.classList.add("selected");
    }
  }
};
