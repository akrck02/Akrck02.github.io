import { materialHourChooser } from "../../../components/materialHourHandler.js";
import { materialInput } from "../../../components/materialInput.js";
import { COMPONENT_TYPES } from "../../../config/constants/components.js";
import { CLASSES } from "../../../lib/BubbleClasses.js";
import { create } from "../../../lib/GTD_Component.js";
import { CLOCK, INFO, LOCATION } from "../../../lib/GTD_MaterialIcons.js";
import { STYLES } from "../../configuration/styles.js";
import { EVENT_BUNDLE } from "../bundles/bundle_es.js";

export const mobileEventPanel = () => {
  const panel = create({
    type: "panel",
    styles: {
      width: "100%",
      height: "100%",
      transition: "1s",
      opacity: 0,
    },
  });

  
  const row1 = create({
    type: COMPONENT_TYPES.ROW,
    classes: [
      CLASSES.BOX_COLUMN,
      CLASSES.BOX_Y_CENTER,
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


  titleInput.appendTo(row1.element)
  hourInput.appendTo(row1.element)
  locationInput.appendTo(row1.element)
  
  row1.appendTo(panel.element);
  return panel;
};
