import { CONFIG, PATHS, VIEWS } from "../../config/config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import {
    isShortDevice,
    isSmallDevice,
} from "../../lib/gtd/web/responsivetools.js";
import { CLASS } from "../../core/css.js";
import IconButton from "../../components/iconButton.js";
import { CODE, FAVORITE, GAME, PLAY } from "../../lib/gtd/material/materialicons.js";
import { current_events } from "../../core/yearEvents.js";

export default function show(): void {
    let title = CONFIG.APP_NAME;
    document.title = title;
    const a = current_events;

    const view = new UIComponent({ 
        classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
        type: "div",
        styles: {
            width: "100%",
            height: "100%",
            background: "#fff",
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transition: ".25s",
            opacity: "0",
        },
    });

    const logo = new UIComponent({
        type: "img",
        attributes: {
            src: PATHS.IMAGES + "logo.svg",
            alt: "Logo",
        },
        styles: {
            maxHeight: isShortDevice() ? "35vh" : "50vh",
        },
    });

    const mainTitle = new UIComponent({
        type: "h1",
        text: "Akrck02",
        classes: [CLASS.H1, CLASS.CENTER_TEXT],
        styles: {
            fontFamily: "Caesar dressing",
            fontWeight: "400",
            padding: "10px",
            fontSize: "3em",
            margin: "0 3px",
            color: "#707070",
        },
    });

    const buttonBar = new UIComponent({
        classes: [CLASS.BOX_ROW, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    });

    const codeButton = new IconButton({
        icon: CODE({
            size: isSmallDevice() || isShortDevice() ? 28 : 40,
            fill: "#707070",
        }),
        title: "Code",
        color: "#707070",
        accent: "dodgerblue",
        index: 1,
        events: {
            click: () => (location.href = VIEWS.CODE),
        },
    }).get();

    const gameButton = new IconButton({
        icon: GAME({
            size: isSmallDevice() || isShortDevice() ? 28 : 40,
            fill: "#707070",
        }),
        title: "Games",
        color: "#707070",
        accent: "dodgerblue",
        index: 1,
        events: {
            click: () => (location.href = VIEWS.GAMES),
        },
    }).get();

    const mediaButton = new IconButton({
      icon: PLAY({
          size: isSmallDevice() || isShortDevice() ? 28 : 40,
          fill: "#707070",
      }),
      title: "Media",
      color: "#707070",
      accent: "dodgerblue",
      index: 1,
      events: {
          click: () => (location.href = VIEWS.MEDIA),
      },
  }).get();

  const aboutButton = new IconButton({
    icon: FAVORITE({
        size: isSmallDevice() || isShortDevice() ? 28 : 40,
        fill: "#707070",
    }),
    title: "About me",
    color: "#707070",
    accent: "dodgerblue",
    index: 1,
    events: {
        click: () => (location.href = VIEWS.ABOUT),
    },
}).get();

    codeButton.appendTo(buttonBar);
    gameButton.appendTo(buttonBar);
    mediaButton.appendTo(buttonBar);
    aboutButton.appendTo(buttonBar);

    logo.appendTo(view);
    mainTitle.appendTo(view);
    buttonBar.appendTo(view);
    view.appendTo(document.body);


    setTimeout(() => {
        view.element.style.opacity = "1";
    }, 200);
}
