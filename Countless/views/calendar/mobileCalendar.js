import { settings } from "../../config/settings.js";
import { create } from "../../lib/GTD_Component.js";
import { jsonForEach } from "../../lib/GTD_DataTools.js";

export const mobileCalendar = (properties) => {
  const calendar = create({
    type: "calendar",
    classes: ["box-column"],
    styles: {
      transition: "1s",
      opacity: 0,
      height: "100%",
      overflow : "auto"
    },
  });
  const weekdate = new Date(
    properties.today.getFullYear() + " " + (properties.month + 1) + "-1"
  );
  let weekday = weekdate.getDay();
  let firstDay = properties.last;

  if(properties.events)
    properties.events = properties.events[properties.month + 1]

  for (let i = 1; i <= properties.last; i++) {

      const day = create({
      type: "box",
      classes : ['box-column','box-x-start'],
      styles: {
        padding: "10px",
        fontSize: "1.2em",
        fontFamily: "Roboto",
        borderTop : "1px solid #f0f0f0",
      },
      events : {
        click : () => location.href = settings().URL + "events/" + i + "/" + (properties.month + 1)
      }
    });
    day.appendTo(calendar.element);

    const isToday = i == properties.today.getDate() && properties.month == properties.today.getMonth();
    const title = create({
      type : 'text',
      text: isToday? "Hoy " + i : i,
      styles : {
        marginBottom: "8px",
        color :  isToday ? "var(--accent_color)" : "#404040", 
        marginLeft: "4px",
        cursor : 'pointer'
      }
    });

    title.appendTo(day.element);

    if (properties.events && properties.events[i]) {
            jsonForEach(properties.events[i],(event) =>{
                const eventEl = create({
                  type: "event",
                  text: event.title,
                  styles: {
                    padding: "15px",
                    margin: "3.5px",
                    fontSize: ".7em",
                    fontFamily: "Roboto",
                    background : "#f0f0f0",
                    borderRadius : "3px",
                    borderRadius : "3px",
                  },
                });
                eventEl.appendTo(day.element);
            });
    }

    if (weekday % 7 == 0) {
        firstDay = i + 1;
  
        const lastweekday =
          firstDay + 7 > properties.last ? properties.last : firstDay + 7;
        const weekTitle = create({
          type: "weekSeparator",
          styles: {
            //borderBottom : '2px solid #f0f0f0'
          },
        });
        weekTitle.appendTo(calendar.element);
      }

      weekday ++;
  }

  return calendar;
};


const divideInWeeks = (properties) => {

  const diff = 7 - properties.weekday;
  let lastWeekDay = properties;

  for (let i = 0; i < properties.last; i++) {
   
    
  }
}