import { hideTooltip } from "../../components/tooltip.js";
import { settings } from "../../config/settings.js";
import { getMonth, getWeekDay, getWeekDayLetter } from "../../core/monthCalc.js";
import { create } from "../../lib/GTD_Component.js";

export const desktopCalendar = (properties) => {

    let m = properties.month;
    let today = properties.today;
    let last = properties.last;
    let events = properties.events;

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
              type:'icon',
              text: 'Más...',
              styles : {
                'font-size': '.7em',
                'text-align': 'right',
                'font-family': 'Roboto',
                color : 'var(--accent_color)',
                position: 'absolute',
                bottom: '10px',
                right: '15px',
              },
            }).appendTo(day.element);
            count ++;
          }
          
        }
        day.element.onclick = () => location.href = settings().URL + "events/" + i + "/" + (m + 1)
        day.appendTo(calendar.element);
      }
      if (weekday != 1)
          fillGaps(calendar, 8 - --weekday);
      return calendar;
} 


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
        position: 'relative',
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
        "border-radius": "3px",
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
        position: 'relative',
        display: "flex",
        "justify-content": "flex-start",
        "align-items": "center",
        "font-size": ".8em",
        padding: ".3em",
        "padding-left": "5px",
        width: "100%",
      },
      events: {
        mouseover : (e) => showTooltip(
          CLOCK({
            size: "15px",
            fill: "#C5C5C5"
          })
          , event.title.initCap() , e),
        mouseout : hideTooltip,
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
  