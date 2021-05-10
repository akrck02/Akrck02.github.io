import { currentMonth, currentYear, getWeekDayIndex, getWeekDayLetter, lastday } from "../core/monthCalc.js";
import { create, setClasses, setEvents } from "../lib/GTD_Component.js";

/**
* Create a mini calendar
*/
export const miniCalendar = (year,month,selected,fn) => {

    //Component inside structure
   const comp = create({
       id : "minicalendar",
       classes : ['box-row','box-warp'],
       styles : {
        width : "250px",
        height : "250px",
       }
   });

   for (let i = 0; i < 7; i++){
    const weekday = create({
        text : getWeekDayLetter(i),
        classes : ['box-center'],
        styles : {
            width : "calc(100% / 7)",
            padding : "5px",
            color : '#c5c5c5',
        }
    }); 
   weekday.appendTo(comp.element);
   }

   const firstDayWeekIndex = getWeekDayIndex(year,month,1);
   for (let i = 1; i < firstDayWeekIndex; i++){
    const gap = create({
        classes : ['box-center'],
        styles : {
            width : "calc(100% / 7)",
            padding : "5px",
        }
    }); 
   gap.appendTo(comp.element);
   }


   for (let d = 1; d <= lastday(year,month); d++) {
       const day = create({
           text : d,
           classes : ['day','box-center','hover_gray'],
           id : "day" + d,
           styles : {
               width : "calc(100% / 7)",
               padding : "5px",
               cursor : "pointer"
           },
           dataset : {
               day : d
           }
       }); 
       if(d == selected && month == currentMonth() && year == currentYear()) setClasses(day.element,['selected']);
       setEvents(day.element,{click  : () => fn(day)});
       day.appendTo(comp.element);        
   }

   //inner functions
   comp.getSelected = () => comp.element.querySelector(".day.selected").dataset.day;

   return comp;
}

export const selectMinicalendarDay = () => {
    const allDays = document.querySelectorAll("#minicalendar>.day");
    allDays.forEach(day => day.classList.remove("selected"));
}
