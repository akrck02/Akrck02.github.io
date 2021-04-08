import { settings } from "../../config/settings.js";
import { get_project } from "../../connectors/projects.js";
import { create } from "../../lib/component.js";
import { resolveAfter } from "../../lib/sync.js";

export const projects_menu_entry = (properties) => {
  const comp = create({
    type: "menu_entry",
    classes: ["project_menu_entry", "b-12", "box-column"],
    id: "title_" + properties.id,
  });

  const title_bar = create({
    type: "title_bar",
    classes: ["title_bar"],
    events: { click: () => break_down_project("title_", properties.id) },
  });

  const title = create({
    type: "span",
    text: properties.project,
  });

  const icon_bar = create({
    type: "div",
    classes: ["icon_bar"],
  });

  const content = create({
    type: "content",
    classes: ["content", "box-column"],
    styles: {
      height: "auto",
    },
  });

  title.appendTo(title_bar.element);
  title_bar.appendTo(comp.element);
  icon_bar.appendTo(title_bar.element);
  content.appendTo(comp.element);
  return comp;
};

function break_down_project(suffix, id) {
  close_projects();

  const title_bar = document.querySelector("#" + suffix + id + " .title_bar");
  title_bar.classList.add("selected");

  const icon_bar = document.querySelector("#" + suffix + id + " .icon_bar");
  icon_bar.innerHTML = "";
  const expand = create({
    type: "img",
    styles: {
      transform: "rotate(180deg)",
    },
    options: {
      src: settings.COMMON_ICONS + "expand_blue.svg",
    },
  });

  const download = create({
    type: "img",
    options: {
      src: settings.COMMON_ICONS + "download_blue.svg",
    },
  });

  const add = create({
    type: "img",
    options: {
      src: settings.COMMON_ICONS + "add_blue.svg",
    },
  });

  const cont = document.querySelector("#" + suffix + id);
  get_project((json) => {
    const content = cont.querySelector(".content");
    for (const key in json.content) {
      resolveAfter(() => {
        create({
          type: "categories",
          text: get_type(key) + "s",
          styles: {
            "font-weight": "bold",
            padding: "5px",
            "padding-left": "10px",
            "font-size": "1.0em",
            "font-family": "Roboto mono",
          },
        },1).appendTo(content);

        for (const k in json.content[key]) entry(json.content[key][k], content);
      });
    }

    content.style.opacity = 1;
    content.style.height = "auto";
  }, id);

  add.appendTo(icon_bar);
  download.appendTo(icon_bar);
  expand.appendTo(icon_bar);
}

function close_projects() {
  const projects = document.querySelectorAll(".project_menu_entry");
  projects.forEach((pr) => {
    pr.querySelector(".title_bar").className = "title_bar";
    pr.querySelector(".icon_bar").innerHTML = "";
    pr.querySelector(".content").innerHTML = "";
  });
}

function get_type(type) {
  switch (+type) {
    case 1:
      return "Theme";
    case 2:
      return "Button";
    case 3:
      return "Input";
    default:
      return "Component";
  }
}

function entry(data, content) {
  console.log(data);
  const comp = create({
    type: "entry",
    classes: [],
    styles: {
      display: "flex",
      "justify-content": "space-between",
      "align-items": "center",
      padding: "5px",
      "padding-left": "20px",
    },
  });

  const middle_left = create({
    type: "box",
    styles: {
      width: "50%",
      display: "flex",
      "justify-content": "flex-start",
      "align-items": "center",
    },
  });
  const middle_right = create({
    type: "box",
    styles: {
      width: "50%",
      display: "flex",
      "justify-content": "flex-end",
      "align-items": "center",
    },
  });

  const square = create({
    type: "square",
    styles: {
      display: "block",
      height: "8px",
      width: "8px",
      background: "#E5E5E5",
    },
  });

  const name = create({
    type: "name",
    text: data["name"],
    styles: {
      display: "block",
      "padding-left": "20px",
      "font-size": ".8em",
      "font-family": "Roboto mono",
    },
  });

  const type = create({
    type: "type",
    text: get_type(data["type"]),
    styles: {
      width: "50px",
      background: "#e5e5e5",
      padding: "5px",
      "border-radius": "6px",
      "font-size": ".7em",
      "text-align": "center",
    },
  });

  const last = create({
    type: "last_edit",
    text: data["last_edit"].replaceAll("-", "/"),
    styles: {
      display: "block",
      "padding-left": "20px",
      "font-size": ".8em",
      "font-family": "Roboto mono",
      color: "#c5c5c5",
      "padding-right": "10px",
    },
  });

  square.appendTo(middle_left.element);
  name.appendTo(middle_left.element);
  last.appendTo(middle_right.element);
  type.appendTo(middle_right.element);

  middle_left.appendTo(comp.element);
  middle_right.appendTo(comp.element);
  comp.appendTo(content);
}
