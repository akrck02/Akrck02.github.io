import { settings } from "../config/settings.js";
import { create } from "../lib/GTD_Component.js";

export const toolTip = (icon, msg, event) => {
  const comp = create({
    type: "tooltip",
    id: "toolTip",
    styles: {
      transition: ".5s",
      position: "fixed",
      top: event.clientY - 30 + "px",
      left: event.clientX - 60 + "px",
      padding: "10px",
      width: "150px",
      height: "30px",
      "box-shadow": "0px 2px 4px rgba(0,0,0,.10)",
      "border-radius": "4px",
      "font-size": ".7em",
      color: "#c5c5c5",
      display: "flex",
      "align-items": "center",
      background: "#fff",
    },
  });

  const img = create({
    type: "img",
    options: {
      src: icon,
      alt: "i",
    },
    styles: {
      height: "15px",
      width: "15px",
    },
  });

  const text = create({
    type: "text",
    text: msg,
    styles: {
      "padding-left": "6px",
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
      overflow: "hidden",
    },
  });

  img.appendTo(comp.element);
  text.appendTo(comp.element);
  return comp;
};


/**
 * Show a tooltip
 * @param {*} icon 
 * @param {*} msg 
 * @param {*} event 
 */
export const showTooltip = (icon, msg, event) => {
  const tooltip = toolTip(icon, msg, event);
  tooltip.element.style.opacity = 0;
  tooltip.appendTo(document.body);
  setTimeout(() => (tooltip.element.style.opacity = 1), 100);
};

/**
 * hide a tooltip
 */
export const hideTooltip = () => {
  const tooltip = document.querySelector("#toolTip");
  tooltip.style.opacity = 0;
  document.body.removeChild(tooltip);
};
