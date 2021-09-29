import { CLASS } from "../../core/css.js";
import { create } from "../../lib/GTD_Component.js";
import { CODE, SEARCH } from "../../lib/GTD_MaterialIcons.js";
import { getLanguages, PROJECTS } from "../../res/projects.js";
import { github_user, github_user_repos } from "../../services/github.js";
import { SETTINGS } from "../../settings/settings.js";

export const codeV = (params) => {

  let title = SETTINGS.APP_NAME + " - Projects";
  window.title = title;
  document.title = title;

  const view = create({
    classes: [CLASS.BOX_ROW, CLASS.BOX_X_START, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
    },
  });

  const sideMenu = params.sideMenu || createSideMenu();
  const page = params.page || createHomePage();

  sideMenu.appendTo(view);
  page.appendTo(view);
  view.appendTo(document.body);
};


/** Create a side menu for the view */
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

/** create and fill the default list for the view */
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


/** Create the default page for the view */
const createHomePage = () => {
  const page = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_START, CLASS.BOX_Y_START],
    styles:{
      width: "100%",
      height: "100%",
      padding: "15px",
    }
  });

  const title = create({
    classes: [CLASS.H1, CLASS.CENTER_TEXT, CLASS.BOX_X_START],
    styles: {
      width: "100%",
      height: "50px", 
      padding: "10px",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    text: "Hello world!&nbsp;" + CODE({size: 36})
  }); 

  const text = create({
    text : `
      This is a bunch of projects that I have worked on.
      I have created a lot of them and I am always looking for new ideas.

      Feel free to <b>Select one project to start</b>
    `, 
    styles : {
      maxWidth: "700px",
      padding: "10px",
    }
  });

  const langs = create({
    classes : [CLASS.BOX_ROW],
    styles : {
      width: "100%",
      height: "30px",
      padding: "0px",
      backgroundColor: "#ffffff",
    } 
  });

  //create a title "Languages I worked on"
  const titleLangs = create({
    classes : [CLASS.H2, CLASS.LEFT_TEXT],
    styles : {
      width: "100%",
      height: "50px",
      padding: "10px",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    text : "Languages I worked on"
  });

  //for each language create a component
  const langList = getLanguages();
  langList.forEach((lang) => {
    const langItem = create({
      classes : [CLASS.BOX_ROW, CLASS.BOX_X_BETWEEN, CLASS.BOX_Y_CENTER],
      text : lang,
      styles : {
        padding : "3px 10px",
        margin: "5px",
        borderRadius : "300px",
        background : "var(--accent_color)",
        color: "white",
        fontWeight : "",
      },
    });
    langItem.appendTo(langs);
  });

  github_user_repos();

  title.appendTo(page);
  text.appendTo(page);

  titleLangs.appendTo(page);
  langs.appendTo(page);

  return page;
}