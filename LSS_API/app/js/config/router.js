import * as maker from "../views/maker.js";
import * as projects from "../views/projects.js";
import * as login from "../views/login.js";
import * as register from "../views/register.js";
import * as not_found from "../views/not_found.js";
import { settings } from "./settings.js";

const current_view = {name: "", params: []};

export const PATHS = {
  maker: { show: (params) => show(maker, params,'maker') },
  projects: { show: (params) => show(projects, params,'projects') },
  login: { show: (params) => show(login, params,'login') },
  register: { show: (params) => show(register, params,'register') },
  not_found: { show: (params) => show(not_found, params,'') },
};

export function firstload(params) {
  changeFavicon(settings.FAVICON);
  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "./LSS_API/app/style.css";
  styles.id = "appStyle";
  if (document.querySelector("#appStyle") == null)
    document.head.appendChild(styles);

  load(params);
}

export function load(params) {
  document.body.innerHTML = "";

  if (params.length == 0 || localStorage.getItem("Lssmk:usr") == undefined || !validToken()) {
    location.href = settings.PATH + "login"; 
  }

  switch (params[0]) {
    case "":
    case undefined:
      break;
    case "login":
      PATHS.login.show(params.slice(1));
      break;
    case "register":
      PATHS.register.show(params.slice(1));
      break;
    case "projects":
      PATHS.projects.show(params.slice(1));
      break;
    case "maker":
      PATHS.maker.show(params.slice(1));
      break;
    default:
      PATHS.not_found.show(params.slice(1));
      break;
  }
}

export const get_current_view = () => {
  return {
    name : current_view.name,
    params : current_view.params
  };
}

function validToken() {
  return true;
}

function show(view, params, name) {

  current_view.name = name;
  current_view.params = params;

  document.title = view.title;
  window.title = view.title;
  view.show(params);

  const main = document.querySelector(".main");
  if (main != null) {
    main.style.transition = ".75";
    main.style.opacity = "0";
  }

  setTimeout(() => {
    const main = document.querySelector(".main");
    if (main != null) main.style.opacity = "1";
  }, 150);
}

function changeFavicon(src) {
  var link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}

