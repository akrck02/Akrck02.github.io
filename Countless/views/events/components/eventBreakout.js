import { COMPONENT_TYPES } from "../../../config/constants/components.js";
import { CLASSES } from "../../../lib/BubbleClasses.js";
import { create } from "../../../lib/GTD_Component.js";
import { isEmpty } from "../../../lib/GTD_DataTools.js";
import {
  CLOCK,
  EDIT,
  EXPAND,
  INFO,
  LOCATION,
  NO_LOCATION,
} from "../../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../../lib/GTD_ResponsiveTools.js";
import { ACTIONS, STATUS } from "../../configuration/status.js";
import { COUNTLESS_CLASSES, STYLES } from "../../configuration/styles.js";
import { EVENT_BUNDLE } from "../bundles/bundle_es.js";
import { EVENT_TYPES } from "../constants/components.js";

export const eventBreakout = (data) => {
  const fontColor = isSmallDevice() ? STYLES.COLORS.SOFT_BLACK : STYLES.COLORS.GRAY;
  const event = create({
    type: EVENT_TYPES.EVENT,
    classes: [CLASSES.BOX_Y_CENTER,CLASSES.BOX_COLUMN],
    styles: {
      minHeight: "50px",
      borderBottom: STYLES.BORDERS.STANDARD,
    },
    data: {
      closed: true,
    },
    id: "event" + data.id,
  });

  const eventTitlebar = create({
    type: EVENT_TYPES.EVENT_TITLEBAR,
    classes: [
      CLASSES.BOX_Y_CENTER,
      CLASSES.BOX_X_BETWEEN,
      COUNTLESS_CLASSES.EVENT_BREAKOUT
    ],
    styles: {
      padding: "10px",
      width: STYLES.PERCENTAGES.ALL,
      marginBottom: "-0px",
      minHeight: "50px",
      borderLeft: STYLES.BORDERS.STANDARD,
      cursor: STYLES.CURSORS.POINTER,
    },
    events: {
      click: () => {
        const eventComponent = document.querySelector("#event" + data.id);
        hideAll();
        if (eventComponent.dataset.closed) {
          open(eventComponent, data);
          eventComponent.dataset.closed = "true";
        }
      },
    },
  });

  const title = create({
    type: EVENT_TYPES.EVENT_TITLE,
    text: data.title,
    classes: [CLASSES.BOX_Y_CENTER],
    styles: {
      fontSize: isSmallDevice() ? "1.1em" : ".9em",
      fontFamily: STYLES.FONTS.ROBOTO,
      paddingLeft: "5px",
      fontWeight: 0,
    },
    data: {
      selected: false,
    },
  });

  const expand = create({
    id: "expand",
    text: EXPAND({
      size: "25px",
      fill: fontColor,
      classes: [COUNTLESS_CLASSES.TRANSITION_NORMAL],
    }),
  });

  title.appendTo(eventTitlebar.element);
  expand.appendTo(eventTitlebar.element);
  eventTitlebar.appendTo(event.element);
  return event;
};

/**
 * Fill a coponent
 * @param {*} parent
 */
const open = (parent, data) => {
  const titleBar = parent.querySelector(EVENT_TYPES.EVENT_TITLEBAR);

  titleBar.classList.contains(STATUS.SELECTED) ? 
    titleBar.classList.remove(STATUS.SELECTED) : titleBar.classList.add(STATUS.SELECTED);

  const infoComp = parent.querySelector(EVENT_TYPES.INFO);
  if (infoComp == null) {
    const info = create({
      type: EVENT_TYPES.INFO,
      classes: [
        CLASSES.BOX_COLUMN,
        COUNTLESS_CLASSES.TRANSITION_NORMAL
      ],
      styles: {
        fontFamily: STYLES.FONTS.ROBOTO,
        paddingLeft: "17px",
        width: "100%",
        overflow: STATUS.HIDDEN,
        height: "0px",
        opacity: 0,
      },
    });

    const row1 = create({
      type: COMPONENT_TYPES.ROW,
      classes: [
        CLASSES.BOX_ROW,
        CLASSES.BOX_X_START,
        CLASSES.BOX_Y_CENTER
      ],
      styles: {
        minHeight: "35px",
        width: STYLES.PERCENTAGES.ALL,
      },
    });

    const hour = create({
      type: COMPONENT_TYPES.TEXT,
      text: data.hour,
      classes: [CLASSES.BOX_CENTER],
      styles: {
        paddingLeft: "5px",
        color: STYLES.COLORS.HARD_GRAY,
        fontSize: isSmallDevice() ? "1em" : ".8em",
      },
    });

    const clockIcon = create({
      classes: [CLASSES.BOX_CENTER],
      text: CLOCK({
        size: "20px",
        fill: STYLES.COLORS.HARD_GRAY,
      }),
    });

    const row2 = create({
      type: COMPONENT_TYPES.ROW,
      classes: [
        CLASSES.BOX_ROW,
        CLASSES.BOX_X_START,
        CLASSES.BOX_Y_CENTER
      ],
      styles: {
        minHeight : "35px",
        width: STYLES.PERCENTAGES.ALL,
      },
    });

    const description = create({
      type: COMPONENT_TYPES.TEXT,
      text: data.content,
      classes: [CLASSES.BOX_CENTER],
      styles: {
        paddingLeft: "5px",
        color: STYLES.COLORS.HARD_GRAY,
        fontSize: isSmallDevice() ? "1em" : ".8em",
      },
    });

    const descriptionIcon = create({
      classes: [CLASSES.BOX_CENTER],
      text: INFO({
        size: "20px",
        fill: STYLES.COLORS.HARD_GRAY,
      }),
    });

    const row3 = create({
      type: COMPONENT_TYPES.ROW,
      classes: [
        CLASSES.BOX_ROW,
        CLASSES.BOX_X_START,
        CLASSES.BOX_Y_CENTER
      ],
      styles: {
        minHeight: "35px",
        width: STYLES.PERCENTAGES.ALL,
      },
    });

    let location = create({
      type: "add",
      text: data.location ? data.location : "Ubicación desconocida",
      classes: ["box-center"],
      styles: {
        paddingLeft: "5px",
        color: STYLES.COLORS.HARD_GRAY,
        fontSize: isSmallDevice() ? "1em" : ".8em",
        cursor: data.location ? "pointer" : "",
      },
      events: data.location 
        ? {click: () => window.open("https://www.google.es/maps/search/" + data.location,"maps"),} : {},
    });

    const locationIcon = create({
      classes: [CLASSES.BOX_CENTER],
      text: data.location
        ? LOCATION({
            size: "20px",
            fill: STYLES.COLORS.HARD_GRAY,
          })
        : NO_LOCATION({
            size: "20px",
            fill: STYLES.COLORS.HARD_GRAY,
          }),
    });

    const row4 = create({
      type: COMPONENT_TYPES.ROW,
      classes: [
        CLASSES.BOX_ROW,
        CLASSES.BOX_X_START,
        CLASSES.BOX_Y_CENTER
      ],
      styles: {
        minHeight: "35px",
        width: STYLES.PERCENTAGES.ALL,
      },
    });

    let edit = create({
      type: COMPONENT_TYPES.ACTION,
      text: EVENT_BUNDLE.EDIT_EVENT,
      classes: [
        CLASSES.BOX_CENTER,
        CLASSES.ACCENT_HOVER
      ],
      styles: {
        paddingLeft: "5px",
        fontSize: isSmallDevice() ? "1em" : ".8em",
        color: STYLES.COLORS.ACCENT,
        cursor: STYLES.CURSORS.POINTER,
      },
      events: {
        click: ACTIONS.NOTHING,
      },
    });

    const editIcon = create({
      text: EDIT({
        size: "20px",
        fill: STYLES.COLORS.HARD_GRAY,
        classes: [COUNTLESS_CLASSES.TRANSITION_NORMAL],
      }),
    });

    clockIcon.appendTo(row1.element);
    hour.appendTo(row1.element);

    descriptionIcon.appendTo(row2.element);
    description.appendTo(row2.element);

    locationIcon.appendTo(row3.element);
    location.appendTo(row3.element);

    editIcon.appendTo(row4.element);
    edit.appendTo(row4.element);

    row1.appendTo(info.element);
    row2.appendTo(info.element);
    row3.appendTo(info.element);
    row4.appendTo(info.element);
    info.appendTo(parent);

    setTimeout(() => {
      info.element.style.height = "150px";
      info.element.style.opacity = 1;
    }, 100);
  }
};

/**
 * Hide all the breakouts
 */
const hideAll = () => {
  const events = document.querySelectorAll("event");
  events.forEach((event) => hide(event));
};

/**
 * Hide a event breakout
 * @param {*} comp
 */
const hide = (comp) => {
  const titleBar = comp.querySelector(EVENT_TYPES.EVENT_TITLEBAR);
  titleBar.classList.remove(STATUS.SELECTED);

  const info = comp.querySelector(EVENT_TYPES.INFO);
  if (info) {
    info.style.height = "0px";
    info.style.paddingTop = "0px";
    setTimeout(() => {
      try {
        if (!isEmpty(info)) comp.removeChild(info);
      } catch (err) {}
    }, 500);
  }
};
