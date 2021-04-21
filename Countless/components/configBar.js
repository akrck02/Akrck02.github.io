import { create } from "../lib/GTD_Component.js";
import { changeSelectedTab, createTicketsConfig, createUserConfig } from "../views/configuration.js";

export const configBar = () => {
  const comp = create({
    type: "div",
    classes: ["no_copy", "tab_bar", "box-row"],
    styles: {
      background: "transparent",
      border: "none",
    },
  });

  const userTab = create({
    type: "div",
    text: 'Usuario',
    id: "user",
    classes: [
      "tab",
      "center_text",
      "box-center",
      "selected"
    ],
    styles: {
      width: "calc(100% / 5)",
    },
    events : {
        click : () => {
            changeSelectedTab(0);
            createUserConfig();
        }
    }
  });

  const ticketTab = create({
    type: "div",
    text: 'Tickets',
    id: "tickets",
    classes: [
      "tab",
      "center_text",
      "box-center",
    ],
    styles: {
      width: "calc(100% / 5)",
    },
    events : {
        click : () => {
            changeSelectedTab(1);
            createTicketsConfig();
        }
    }
  });

  const calendarTab = create({
    type: "div",
    text: 'Calendario',
    id: "calendar",
    classes: [
      "tab",
      "center_text",
      "box-center",
    ],
    styles: {
      width: "calc(100% / 5)",
    },
    events : {
        click : () => {
            
        }
    }
  });

  userTab.appendTo(comp.element);
  ticketTab.appendTo(comp.element);
  calendarTab.appendTo(comp.element);
  return comp;
};
