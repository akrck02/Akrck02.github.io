import { miniBar } from "../components/bar.js";
import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";

export const errorView = (params) => {
  const code = +params[1];
  console.log("Error code: " + code);
  
  switch (code) {
    case 0:
    case 404:
      showNotFound(params);
      break;
    default:
      showInternalServerError(params);
      break;
  }
};

const showNotFound = (params) => {
  const web_tittle = "Countless ";
  window.title = web_tittle;
  document.title = web_tittle;

  const bar = miniBar();

  const view = create({
    type: "view",
    classes: ["box-center", "box-column", "onepage_app"],
    styles: {
      height: "92vh",
    },
  });

  const img = create({
    type: "img",
    styles: {
      width: "80%",
      "max-width": "150px",
    },
    options: {
      src: settings().ICONS + "help.svg",
      alt: "Not found",
    },
  });

  const title = create({
    type: "h1",
    classes: ["center_text"],
    text: "La página que buscas no existe.",
  });

  const button = create({
    type: "backbutton",
    classes: ["framed_dashed_btn"],
    styles: {
      "--accent_color": "#202020",
    },
    text: "Volver",
    events: {
      click: () => (location.href = settings().URL),
    },
  });

  img.appendTo(view.element);
  title.appendTo(view.element);
  button.appendTo(view.element);
  bar.appendTo(document.body);
  view.appendTo(document.body);
};

const showInternalServerError = (params) => {
  const web_tittle = "Countless - Not found";
  window.title = web_tittle;
  document.title = web_tittle;

  const bar = miniBar();

  const view = create({
    type: "view",
    classes: ["box-center", "box-column", "onepage_app"],
    styles: {
      height: "92vh",
    },
  });

  const img = create({
    type: "img",
    styles: {
      width: "80%",
      "max-width": "150px",
    },
    options: {
      src: settings().ICONS + "support.svg",
      alt: "Not found",
    },
  });

  const title = create({
    type: "h1",
    classes: ["center_text"],
    text: "Ha ocurrido un error inesperado",
    styles: {
      margin: '10px',
      "font-family": "Roboto thin",
    },
  });

  const subtitle = create({
    type: "h3",
    classes: ["center_text"],
    text: "Estamos trabajando en ello",
    styles: {
        color : '#404040',
        margin: '5px',
        'margin-bottom': '15px',
        "font-family": "Roboto thin",
        "font-weight": "100",
    },
  });

  const button = create({
    type: "backbutton",
    classes: ["framed_dashed_btn"],
    styles: {
      "--accent_color": "#202020",
    },
    text: "Volver",
    events: {
      click: () => (location.href = settings().URL),
    },
  });

  img.appendTo(view.element);
  title.appendTo(view.element);
  subtitle.appendTo(view.element);
  button.appendTo(view.element);
  bar.appendTo(document.body);
  view.appendTo(document.body);
};
