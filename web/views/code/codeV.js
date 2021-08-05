import { CLASS } from "../../core/css.js";
import { create } from "../../lib/GTD_Component.js";
import { SEARCH } from "../../lib/GTD_MaterialIcons.js";
import { PROJECTS } from "../../res/projects.js";

export const codeV = (params) => {
  const view = create({
    classes: [CLASS.BOX_ROW, CLASS.BOX_X_START, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
    },
  });

  const sideMenu = createSideMenu();

  sideMenu.appendTo(view);
  view.appendTo(document.body);
};

const createSideMenu = () => {
  const menu = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_Y_START],
    styles: {
      borderRight: "2px solid #f1f1f1",
      height: "100%",
      width: "20%",
      minWidth: "250px",
      padding: "10px",
    },
  });

  const title = create({
    classes: [CLASS.H2, CLASS.BOX_X_BETWEEN, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      height: "50px",
      padding: "10px",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    text:
      "Projects" +
      SEARCH({
        fill: "#404040",
        size: 26,
      }),
  });

  const list = createAndFillList();

  title.appendTo(menu);
  list.appendTo(menu);

  return menu;
};

const createAndFillList = () => {
  const list = create({
    styles: {
      width: "100%",
      height: "100%",
      padding: "10px",
      // backgroundColor: "#f1f1f1",
    },
  });

  const items = PROJECTS();
  const keys = Object.keys(items);

  keys.forEach((key) => {
    const item = create({
      classes: [CLASS.BOX_ROW, CLASS.BOX_X_BETWEEN, CLASS.BOX_Y_CENTER],
      text: key,
      styles: {
        cursor: "pointer",
        padding: "3px",
      },
      events : {
        click: () => location.href = items[key].URL
      }
    });

    console.log(key , items[key]);

    item.appendTo(list);
  });

  return list;
};
