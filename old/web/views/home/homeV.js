import { materialIconButton } from "../../components/material_icon_button.js";
import { CLASS } from "../../core/css.js";
import { create } from "../../lib/GTD_Component.js";
import { CODE, FAVORITE, GAME, PLAY } from "../../lib/GTD_MaterialIcons.js";
import { isShortDevice, isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { PATHS, VIEWS } from "../../settings/settings.js";

export const homeV = () => {
  const view = create({
    classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      width: "100%",
      height: "100%",
      background: "URL('" + PATHS.IMAGES + "Wallpaper.png')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
  });

  const logo = create({
    type: "img",
    options: {
      src: PATHS.IMAGES + "logo.svg",
      alt: "Logo",
    },
    styles: {
      maxHeight: isShortDevice()? "35vh" : "50vh",
    },
  });

  const title = create({
    type: "h1",
    text: "Akrck02",
    classes: [CLASS.H1, CLASS.TEXT_CENTER],
    styles: {
      fontFamily: "Caesar dressing",
      fontWeight: "400",
      padding: "10px",
      fontSize: "3em",
      margin: "0 3px",
      color: '#fff'
    },
  });

  const button_box = create({
    classes: [CLASS.BOX_ROW, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
  });

  const code_button = materialIconButton({
    icon: CODE({
      size: isSmallDevice() || isShortDevice() ? 28 : 40,
      fill: "#fff",
    }),
    title : "Code",
    color: "#fff",
    accent : "#fff",
    index : 1,
    events: {
      click : () => location.href = VIEWS.CODE
    }
  });
  const game_button = materialIconButton({
    icon: GAME({
      size: isSmallDevice() || isShortDevice() ? 28 : 40,
      fill: "#fff",
    }),
    title : "Games",
    color: "#fff",
    accent : "#fff",
    index : 2,
    events: {
      click : () => location.href = VIEWS.GAMES
    }
  });
  const media_button = materialIconButton({
    icon: PLAY({
      size: isSmallDevice() || isShortDevice() ? 28 : 40,
      fill: "#fff",
    }),
    title : "Media",
    color: "#fff",
    accent : "#fff",
    index : 3,
    events: {
      click : () => location.href = VIEWS.MEDIA
    }
  });
  const about_us_button = materialIconButton({
    icon: FAVORITE({
      size: isSmallDevice() || isShortDevice() ? 28 : 40,
      fill: "#fff",
    }),
    title : "About me",
    color: "#fff",
    accent : "#fff",
    index : 4,
    events: {
      click : () => location.href = VIEWS.ABOUT
    }
  });


  const footer = create({
    classes: [CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    styles: {
      position : "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "35px",
      color: "#b2b2b2",
    },
  });

  const text = create({
    classes: [CLASS.TEXT_CENTER],
    text: "Akrck02 2021 - All rights reserved"
  });

  code_button.appendTo(button_box);
  game_button.appendTo(button_box);
  media_button.appendTo(button_box);
  about_us_button.appendTo(button_box);

  text.appendTo(footer);

  logo.appendTo(view.element);
  title.appendTo(view.element);
  button_box.appendTo(view.element);
  footer.appendTo(view.element);

  view.appendTo(document.body);
};
