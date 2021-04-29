import { bar } from "../../components/bar.js";
import { months } from "../../components/monthBar.js";
import { hideTooltip, showTooltip } from "../../components/tooltip.js";
import { settings } from "../../config/settings.js";
import { getProperty } from "../../config/userSettings.js";
import { getMonth, getWeekDay, getWeekDayLetter } from "../../core/monthCalc.js";
import { create } from "../../lib/GTD_Component.js";
import { isEmpty, orElse } from "../../lib/GTD_DataTools.js";
import { CLOCK } from "../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { getMonthEventService } from "../../services/eventService.js";
import { desktopCalendar } from "./desktopCalendar.js";
import { mobileCalendar } from "./mobileCalendar.js";

/**
 * Show the calendar view
 * @param {array} params
 */
export const calendarView = (params) => {
  const web_tittle = "Countless - Calendar";
  window.title = web_tittle;
  document.title = web_tittle;

  const view = create({
    type: "view",
    classes: ["main", "box-column"],
    styles: {
      height: "100vh",
      width: "100vw",
    },
  });

  const titleBar = bar({
    title: "Calendario",
    showQR : true
  });
  const monthBar = months();

  titleBar.appendTo(view.element);
  monthBar.appendTo(view.element);

  view.appendTo(document.body);
  prepareEvents();

  let month = params[1];
  if(isEmpty(month) || month > 12 || month < 1) 
    month = new Date().getMonth();
  else month--;
  document.querySelectorAll(".monthTab")[month].click();
};


/**
 * Prepare events 
 */
const prepareEvents = () => {
  for (let i = 0; i < 12; i++) {
    const tab = document.querySelector("#month" + i);
    tab.onclick = () => {
      const months = document.querySelectorAll(".monthTab");
      months.forEach((m) => {
        if (m.dataset.month == i) m.classList.add("selected");
        else {
          m.className = "";
          m.classList.add("tab");
          m.classList.add("monthTab");
          m.classList.add("box-center");
          m.classList.add("center_text");
        }
      });
      drawMonth(i);
    };
  }
};

/**
 * Get last day of the month
 * @param {*} y 
 * @param {*} m 
 * @returns 
 */
const lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
};

/**
 * Draw a month
 * @param {*} i 
 */
const drawMonth = (i) => {
  let view = document.querySelector("view");
  let calendar = document.querySelector("calendar");

  if (calendar != null) {
    view.removeChild(calendar);
  }
  calendar = createCalendar(i);
};

const createCalendar = (m) => {
  const today = new Date();
  const last = lastday(today.getFullYear(), m);

  getMonthEventService(
    (json) => {
      const view = document.querySelector("view");
      const events = json.success ? json.content : {};
      
      const properties = {
        month : m,
        today : today,
        last : last,
        events : events,
      };

      const calendar = isSmallDevice() ? mobileCalendar(properties) : desktopCalendar(properties) ;
      calendar.appendTo(view);
     

      setTimeout(() => (calendar.element.style.opacity = 1), 50);
    },
    getProperty("auth"),
    today.getFullYear() + "-" + (m + 1) + "-1",
    today.getFullYear() + "-" + (m + 1) + "-" + last
  );
};
