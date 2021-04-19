import { bar } from "../components/bar.js";
import { months } from "../components/monthBar.js";
import { checkLogin } from "../config/router.js";
import { getMonth, getWeekDay, getWeekDayLetter } from "../core/monthCalc.js";
import { create } from "../lib/component.js";

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
        drawMonth(i);
      });
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
  const view = document.querySelector("view");

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

  const today = new Date();
  const last = lastday(today.getFullYear(), m);

  const weekdate = new Date(today.getFullYear() + " " + (m + 1) + "-1");
  let weekday = weekdate.getDay();

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

  for (let i = 1; i <= last; i++) {
    const selected = today.getMonth() == m && i == today.getDate();
    const classname = selected ? "selected" : "_";
    const day = create({
      type: "day",
      classes :['selectable'],
      data: {
        weekday: getWeekDay(weekday - 1),
        weekdayletter: getWeekDayLetter(weekday - 1),
      },
      styles: {
        display: "block",
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
              let span = e.target.querySelector("span");

              if (span == null) span = e.target;

              span.innerHTML = i + " - " + e.target.dataset.weekday.substr(0,3);
            },
            mouseout: (e) => {
              let span = e.target.querySelector("span");

              if (span == null) span = e.target;

              span.innerHTML = i;
            },
          },
    });

    const span = create({
      type: "span",
      text: (selected ? " Hoy " : "") + i,
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

    weekday++;
    if (weekday > 7) weekday = 1;
    span.appendTo(day.element);
    day.appendTo(calendar.element);
  }

  if(weekday != 1)  
  for (let i = weekday; i < 8; i++) {
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

  calendar.appendTo(view);
  setTimeout(() => {
    calendar.element.style.opacity = 1;
  }, 50);
};

const getCalendar = (i) => {
  return null;
};
