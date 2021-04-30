import { create } from "../../../lib/GTD_Component.js";
import { CLOCK, EVENTS, INFO, LOCATION, SAVE } from "../../../lib/GTD_MaterialIcons.js";
import { materialInput } from "../../../components/materialInput.js";
import { materialSelect } from "../../../components/materialSelect.js";
import { materialHourChooser } from "../../../components/materialHourHandler";
import { COMPONENT_TYPES } from "../../../config/constants/components.js";
import { CLASSES } from "../../../lib/BubbleClasses.js";
import { EVENT_BUNDLE } from "../bundles/bundle_es.js";
import { STYLES } from "../../configuration/styles.js";

export const desktopEventPanel = (view) => {
    const panel = create({
      type: COMPONENT_TYPES.PANEL,
      styles: {
        width: "calc(100% - 400px)",
        height: "100%",
      },
      classes: [
        CLASSES.BOX_COLUMN,
        CLASSES.BOX_Y_CENTER,
        CLASSES.BOX_X_START
      ],
    });
  
    const wrapper = create({
      type: COMPONENT_TYPES.BOX,
      classes: [
        CLASSES.BOX_COLUMN,
        CLASSES.BOX_Y_START,
        CLASSES.BOX_X_START
      ],
      styles: {
        width: "100%",
        maxWidth: "700px",
        padding: "10px",
        margin: "20px",
      },
    });
  
    const title = create({
      type: COMPONENT_TYPES.TEXT,
      classes: [
        CLASSES.LEFT_TEXT,
        CLASSES.BOX_Y_CENTER,
        CLASSES.BOX_X_BETWEEN  
      ],
      text: EVENT_BUNDLE.NEW_EVENT,
      styles: {
        padding: "9px",
        paddingLeft: "20px",
        paddingRight: "20px",
        width: "100%",
        fontSize: ".9em",
        fontFamily: "Roboto",
        minHeight: "51px",
        color: "#202020",
        borderBottom: "1px solid " +  STYLES.COLORS.BORDER_GRAY,
      },
    });
    const right = create({
      type: COMPONENT_TYPES.BOX,
      classes: [CLASSES.BOX_Y_CENTER, CLASSES.BOX_X_END],
    });
  
    const save = create({
      type: COMPONENT_TYPES.ICON,
      classes: [CLASSES.BOX_CENTER, CLASSES.ACCENT_HOVER],
      text: SAVE({
        fill: STYLES.COLORS.BLACK,
        size: "17px",
      }),
      styles: {
        cursor: STYLES.CURSORS.POINTER,
        padding: "7px",
      },
    });
  
    const move = create({
      type: COMPONENT_TYPES.ICON,
      classes: [CLASSES.BOX_CENTER,CLASSES.ACCENT_HOVER],
      text: EVENTS({
        fill: STYLES.COLORS.BLACK,
        size: "17px",
      }),
      styles: {
        cursor: STYLES.CURSORS.POINTER,
        padding: "7px",
      },
    });
  
    move.appendTo(right.element);
    save.appendTo(right.element);
    right.appendTo(title.element);
  
    const row1 = create({
      type: COMPONENT_TYPES.ROW,
      classes: [
        CLASSES.BOX_ROW,
        CLASSES.BOX_X_START,
        CLASSES.BOX_Y_CENTER
        ],
      styles: {
        minHeight: "35px",
        width: "100%",
      },
    });
  
    const titleInput = materialInput({
      title: EVENT_BUNDLE.TITLE,
      id: "title",
      width: "200px",
      events: {
        input: () => console.log(),
      },
      svg: INFO({
        fill: STYLES.COLORS.GRAY,
        size: "20px",
      }),
    });
  
    const hourInput = materialInput({
      title: EVENT_BUNDLE.HOUR,
      id: "hour",
      width: "200px",
      condition: (value) =>  true,
      error: (value) => {},
      success: (value) => {},
      handler: materialHourChooser({ id: "hour" }),
      svg: CLOCK({
        fill:  STYLES.COLORS.GRAY,
        size: "20px",
      }),
    });
  
    const locationInput = materialInput({
      title: EVENT_BUNDLE.LOCATION,
      type: COMPONENT_TYPES.TEXT,
      id: "location",
      width: "200px",
      condition: (value) => {
        return value.length < 10;
      },
      error: (value) => {},
      success: (value) => {},
      svg: LOCATION({
        fill: "#C5C5C5",
        size: "20px",
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
        minHeight: "35px",
        marginTop: "35px",
        width: "100%",
      },
    });
  
    const type = materialSelect({
      placeholder: "Tipo evento",
      options: [
        { key: EVENT_BUNDLE.EDUCATION, value: "0" },
        { key: EVENT_BUNDLE.RESERVATION, value: "1" },
        { key: EVENT_BUNDLE.MEETING, value: "2" },
      ],
    });
  
    titleInput.appendTo(row1.element);
    hourInput.appendTo(row1.element);
    locationInput.appendTo(row1.element);
  
    type.appendTo(row2.element);
  
    row1.appendTo(wrapper.element);
    row2.appendTo(wrapper.element);
  
    title.appendTo(panel.element);
    wrapper.appendTo(panel.element);
    panel.appendTo(view.element);
  };