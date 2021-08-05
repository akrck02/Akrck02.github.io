import { CLASS } from "../core/css.js";
import { create } from "../lib/GTD_Component.js";
import { isSmallDevice } from "../lib/GTD_ResponsiveTools.js";

export const materialIconButton = (properties) => {
  const button = create({
    type: "div",
    classes: [CLASS.HOME_BUTTON],
    events: properties.events || {},
    styles : 
      isSmallDevice() ? {
        padding : "0px",
        width : "0%"
      }:{}
  });

  const icon = create({
    text: properties.icon,
  });

  const title = create({
    text: properties.title,
    styles: {
      fontSize: isSmallDevice()? ".9em" : "1.2em",
      fontWeight: "bold",
      color: properties.color || "#404040"
    },
  });

  if(properties.accent) button.element.style.setProperty("--accent_color", properties.accent);
  if(properties.index) button.element.setAttribute("tabindex", properties.index);

  icon.appendTo(button);
  title.appendTo(button);
  return button;
};
