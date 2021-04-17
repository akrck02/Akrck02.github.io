import { bar } from "../components/bar.js";
import { months } from "../components/monthBar.js";
import { checkLogin } from "../config/router.js";
import { getMonth } from "../core/monthCalc.js";
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

  const titleBar = bar();
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

  for (let i = 1; i <= last; i++) {
    const selected = today.getMonth() == m && i == today.getDate();
    const classname = selected ? "selected" : "_";
    const day = create({
      type: "day",
      styles: {
        display: "block",
        height: "calc(100% /4)",
        'min-height' : '150px',
        padding: "10px",
        width: "calc(100% / 7)",
        border: ".5px solid #e9e9e9",
        color: "#c2c2c2",
        overflow: "hidden",
      },
    });

    const span = create({
      type: "span",
      text: (selected ? " Hoy " : "") + i,
      classes: [classname],
      styles: {
        padding: "8px",
        display: "block",
        "box-shadow": selected ? "0px 2px 4px rgba(0,0,0,.1)" : "none",
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
