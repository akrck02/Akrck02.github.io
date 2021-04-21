import { bar } from "../components/bar.js";
import { months } from "../components/monthBar.js";
import { hideTooltip, showTooltip, toolTip } from "../components/tooltip.js";
import { settings } from "../config/settings.js";
import { getProperty } from "../config/userSettings.js";
import { getMonth, getWeekDay, getWeekDayLetter } from "../core/monthCalc.js";
import { create } from "../lib/GTD_Component.js";
import { getMonthEventService } from "../services/eventService.js";

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

  const titleBar = bar("Calendario");
  const monthBar = months();

  titleBar.appendTo(view.element);
  monthBar.appendTo(view.element);

  view.appendTo(document.body);
  prepareEvents();

  document.querySelectorAll(".monthTab")[new Date().getMonth()].click();
};

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

const lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
};

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
    
      const calendar = create({
        type: "calendar",
        data: {
          month: getMonth(m),
        },
        styles: {
          height: "100%",
          opacity: 0,
          transition: "1s",
        },
        classes: ["no_copy", "box-row", "box-warp", "b-12"],
      });

      const weekdate = new Date(today.getFullYear() + " " + (m + 1) + "-1");
      let weekday = weekdate.getDay();

      fillGaps(calendar, weekday);
      for (let i = 1; i <= last; i++) {
        const day = newDay(today, i, weekday,m);
        weekday++;
        if (weekday > 7) weekday = 1;

        if (events[m + 1] != undefined && events[m + 1][i] != undefined) {
          const todayEvents = events[m + 1][i];

          let count = 0;
          for (const key in todayEvents){
            if(count < 4)
                newEvent(todayEvents[key]).appendTo(day.element);
            else create({
              type:'event',
              text: '+',
              styles : {
                'font-size': '1.3em',
                'text-align': 'right',
                'color': 'var(--accent_color)',
                'position': 'relative',
                'top': '0px'
              },
              events: {
                mouseover : (e) => showTooltip(settings().ICONS + "info_gray.svg" , "Más eventos" , e),
                mouseout : hideTooltip
              }
            }).appendTo(day.element);
            count ++;
          }
           
        }
        day.appendTo(calendar.element);
      }

      if (weekday != 1) fillGaps(calendar, 8 - --weekday);

      calendar.appendTo(view);
      setTimeout(() => (calendar.element.style.opacity = 1), 50);
    },
    getProperty("auth"),
    today.getFullYear() + "-" + (m + 1) + "-1",
    today.getFullYear() + "-" + (m + 1) + "-" + last
  );
};

/**
 * Create a new day in the calendar
 * @param {*} date      - The date
 * @param {*} index     - The index
 * @param {*} weekday   - The weekday
 * @param {*} month     - The month
 * @returns
 */
const newDay = (date, index, weekday, month) => {
  const selected = date.getMonth() == month && index == date.getDate();
  const classname = selected ? "selected" : "_";
  const day = create({
    type: "day",
    classes: ["selectable"],
    data: {
      weekday: getWeekDay(weekday - 1),
      weekdayletter: getWeekDayLetter(weekday - 1),
    },
    styles: {
      display: "flex",
      "flex-direction": "column",
      height: "calc(100% /4)",
      "min-height": "150px",
      padding: "10px",
      width: "calc(100% / 7)",
      border: ".5px solid #e9e9e9",
      color: "#c2c2c2",
      overflow: "hidden",
      cursor: "pointer",
    },
    events: selected
      ? {}
      : {
          mouseover: (e) => {
            if (e.target.tagName != "DAY" && e.target.tagName != "DAYNUM")
              return;
            let span = e.target.querySelector("dayNum");
            if (span == null) span = e.target;

            span.innerHTML =
              index + " - " + e.target.dataset.weekday.substr(0, 3);
          },
          mouseout: (e) => {
            if (e.target.tagName != "DAY" && e.target.tagName != "DAYNUM")
              return;

            let span = e.target.querySelector("dayNum");
            if (span == null) span = e.target;

            span.innerHTML = index;
          },
        },
  });

  const span = create({
    type: "dayNum",
    text: (selected ? " Hoy " : "") + index,
    classes: [classname],
    id: "day",
    data: {
      weekday: getWeekDay(weekday - 1),
      weekdayletter: getWeekDayLetter(weekday - 1),
    },
    styles: {
      padding: "8px",
      display: "block",

      width: "100%",
      "border-radius": "4px",
    },
  });
  span.appendTo(day.element);
  return day;
};

/**
 * Creates a new event component
 * @param {*} event - The event properties
 * @returns The event component
 */
const newEvent = (event) => {

  const color ="var(--accent_color)";
  const eventComp = create({
    type: "event",
    id: "event" + event.id,
    styles: {
      display: "flex",
      "justify-content": "flex-start",
      "align-items": "center",
      "font-size": ".8em",
      padding: ".3em",
      "padding-left": "5px",
      width: "100%",
    },
    events: {
      mouseover : (e) => showTooltip(settings().ICONS + "clock_gray.svg" , event.title.initCap() , e),
      mouseout : hideTooltip
    }
  });

  const eventBadge = create({
    type: "badge",
    styles: {
      display: "block",
      width: "3px",
      'min-height': "10px",
      'border-Radius': "90px",
      background: color,
    },
  });

  const eventText = create({
    type: "div",
    text: event.hour + " - " + event.title.initCap(),
    styles: {
      'margin-left': "3px",
      "width" : "max-width",
      "white-space" : "nowrap",
      "text-overflow" : "ellipsis",
      "overflow" : "hidden" 
    },
  });

  eventBadge.appendTo(eventComp.element);
  eventText.appendTo(eventComp.element);
  return eventComp;
};

/**
 * Fill gaps of the calendar
 * @param {*} calendar - Calendar view
 * @param {*} weekday - Weekday
 */
const fillGaps = (calendar, weekday) => {
  for (let i = 1; i < weekday; i++) {
    const day = create({
      type: "day",
      styles: {
        display: "block",
        height: "calc(100% /4)",
        "min-height": "150px",
        padding: "10px",
        width: "calc(100% / 7)",
        border: ".5px solid #e9e9e9",
        background: "#f7f7f7",
        overflow: "hidden",
      },
    });

    const span = create({
      type: "span",
      styles: {
        padding: "8px",
        display: "block",
        "box-shadow": "none",
        width: "70px",
        "border-radius": "6px",
      },
    });

    span.appendTo(day.element);
    day.appendTo(calendar.element);
  }
};
