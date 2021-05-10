import { create } from "../../../lib/GTD_Component.js";
import { NO_EVENT } from "../../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../../lib/GTD_ResponsiveTools.js";
import { eventBreakout } from "./eventBreakout.js";

/**
 * Create a list
 * @param {*} view
 * @param {*} params
 */
 export const eventList = (view, params) => {
    const fontColor = "#404040" ;
  
    const events = create({
      type: "events",
      classes: ["main", "box-column"],
      styles: {
        width: isSmallDevice() ? "100%" : "400px",
        height: "100%",
        overflow: "auto",
        "border-right": "1px solid #e9e9e9",
      },
    });
    if (params[3]) {
      for (const key in params[3]) {
        const data = params[3][key];
        const event = eventBreakout(data);
        event.appendTo(events.element);
      }
    } else {
      const noEvents = create({
        type: "box",
        classes: ["box-y-center", "box-x-between"],
        styles: {
          "border-bottom": "1px solid #e9e9e9",
          padding: "15px",
          "min-height": "51px",
          color: fontColor,
        },
      });
  
      const noEventMessage = create({
        type: "text",
        text: "No hay eventos en esta fecha",
        styles: {
          fontFamily : "Roboto",
          fontSize : isSmallDevice() ? "1em" : ".8em"
        },
      });
  
      const noEventIcon = create({
        type: "icon",
        classes: ["box-center"],
        text: NO_EVENT({
          fill: fontColor,
          size: "20px",
        }),
      });
  
      noEventMessage.appendTo(noEvents.element);
      noEventIcon.appendTo(noEvents.element);
      noEvents.appendTo(events.element);
    }
  
    events.appendTo(view.element);
  };
  