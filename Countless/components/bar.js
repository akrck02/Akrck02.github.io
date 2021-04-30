import { COMPONENT_TYPES } from "../config/constants/components.js";
import { settings } from "../config/settings.js";
import { createQR } from "../core/createQR.js";
import { CLASSES } from "../lib/BubbleClasses.js";
import { create } from "../lib/GTD_Component.js";
import { QR_CODE, SUMMATION } from "../lib/GTD_MaterialIcons.js";
import { downloadURI } from "../lib/GTD_UrlTools.js";

export const bar = (properties) => {
  if (!properties) properties = {};

  let msg = properties.title;
  const showQR = properties.showQR;
  const extraOptions = properties.options;

  const bar = create({
    type: COMPONENT_TYPES.BAR,
    classes: [
        CLASSES.MINIMAL_BAR, 
        CLASSES.NO_COPY, 
        CLASSES.BOX_X_BETWEEN
    ],
    styles: {
      background: "#202020",
    },
  });

  const left = create({
    type: COMPONENT_TYPES.BOX,
    classes: [
        CLASSES.BOX_Y_CENTER,
        CLASSES.BOX_X_START
    ],
  });

  const right = create({
    type: COMPONENT_TYPES.BOX,
    classes: [
        CLASSES.BOX_Y_CENTER,
        CLASSES.BOX_X_END
    ],
    styles: {
      marginRight: "5px",
    },
  });

  const logo = create({
    text: SUMMATION({
      size: "28px",
      classes: [CLASSES.LOGO],
      fill: "#fff",
    }),
    classes: [CLASSES.BOX_Y_CENTER],
    styles: {
      margin: 0,
      height: "100%",
    },
    events: {
      click: () => (location.href = settings().URL + "home/"),
    },
  });

  msg = msg == undefined ? "Bienvenido " + settings().USER : msg;
  const title = create({
    type: COMPONENT_TYPES.TEXT,
    text: msg,
    styles: {
      margin: 0,
      marginLeft: "10px",
      color:    "#fff",
      fontFamily: "Roboto thin",
      fontWeight: "600",
      fontSize: "1.4em",
    },
  });

  logo.appendTo(left.element);
  title.appendTo(left.element);

  if (showQR) {
    const qrIcon = create({
      type: COMPONENT_TYPES.ICON,
      classes: [CLASSES.BOX_CENTER],
      styles: {
        cursor: "pointer",
      },
      text: QR_CODE({
        size: "28px",
        fill: "#fff",
      }),
      events: {
        click: () => {
          let uri = createQR({
            url: location.href,
          });
          downloadURI(uri, "QR_CODE.png");
        },
      },
    });

    qrIcon.appendTo(right.element);
  }

  if (extraOptions)
    extraOptions.forEach((option) => option.appendTo(right.element));

  left.appendTo(bar.element);
  right.appendTo(bar.element);

  return bar;
};