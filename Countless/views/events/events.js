import { bar } from "../../components/bar.js";
import { getMonth } from "../../core/monthCalc.js";
import { create } from "../../lib/GTD_Component.js";
import { BACK, CLOCK, EVENTS as EVENT, EXPAND, INFO, LOCATION, NO_EVENT, SAVE } from "../../lib/GTD_MaterialIcons.js";
import { eventBreakout } from "./eventBreakOut.js";
import { materialInput } from "../../components/materialInput.js";
import { getMonthEventService } from "../../services/eventService.js";
import { getProperty } from "../../config/userSettings.js";
import { settings } from "../../config/settings.js";
import { materialHourChooser } from "../../components/materialHourHandler.js";
import { materialSelect } from "../../components/materialSelect.js";
import { isMobile, isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";

/**
 * Create events view
 * @param {*} params
 */
export const eventView = (params) => {
  const web_tittle = "Countless - Events";
  window.title = web_tittle;
  document.title = web_tittle;

  const view = create({
    type: "view",
    classes: ["main", "box-column", "no_copy"],
    styles: {
      width: "100vw",
      height: "100vh",
      overflow: "auto",
        'overflow-x': "hidden",
    },
  });

  const title = bar({
    title : "Agenda del " + params[1] + " de " + getMonth(+params[2] - 1),
  });
  title.appendTo(view.element);

  const back = create({
    type: "info",
    classes: ["box-row"],
    styles: {
      padding: "10px",
      width: "100%",
      "border-bottom": "1px solid #e9e9e9",
    },
  });

  const backIcon = create({
    type: "ico",
    text: BACK({
      size: "25px",
    }),
    styles: {
      cursor: "pointer",
    },
    events: {
      click: () => {
        location.href = settings().URL + "calendar/";
      },
    },
  });

  backIcon.appendTo(back.element);
  back.appendTo(view.element);

  getMonthEventService(
    (json) => {
      const wrapper = create({
        type: "wrapper",
        classes: ["box-row"],
        styles: {
          height: "100%",
        },
      });

      if(json.success)
        params[3] = json.content[+params[2]][+params[1]];
     

      wrapper.appendTo(view.element);
      eventList(wrapper, params);
      
      if(!isSmallDevice())
        newEventPanel(wrapper, params);
    },
    getProperty("auth"),
    new Date().getFullYear() + "-" + +params[2] + "-" + (+params[1] - 1),
    new Date().getFullYear() + "-" + +params[2] + "-" + (+params[1] + 1)
  );

  view.appendTo(document.body);
};

/**
 * Create a list
 * @param {*} view
 * @param {*} params
 */
const eventList = (view, params) => {

  const fontColor = isSmallDevice() ? "#404040" : "#c5c5c5" ;

  const events = create({
    type: "events",
    classes: ["main", "box-column"],
    styles: {
      width: isSmallDevice() ? "100%" : "400px",
      height: "100%",
      overflow: "auto",
      "border-right": "1px solid #e9e9e9",
    },
  });
  if (params[3]) {

    for (const key in params[3]) {
      const data = params[3][key];
      const event = eventBreakout(data);
      event.appendTo(events.element);
    }
  } else {
    const noEvents = create({
      type : 'box',
      classes: ['box-y-center','box-x-between'],
      styles: {
        'border-bottom' : '1px solid #e9e9e9',
        padding : '15px',
        'min-height': '51px',
        color : fontColor
      }
    });

    const noEventMessage = create({
      type: 'text',
      text: 'No hay eventos en esta fecha',
      styles : {
        'font-family' : 'Roboto light'
      }
    });

    const noEventIcon = create({
      type : 'icon',
      classes : ['box-center'],
      text : NO_EVENT({
        fill: fontColor,
        size: "20px",
      })
    });

    noEventMessage.appendTo(noEvents.element)
    noEventIcon.appendTo(noEvents.element)
    noEvents.appendTo(events.element)
  }

  events.appendTo(view.element);
};

/**
 *
 */
const newEventPanel = (view, params) => {
  const panel = create({
    type: "type",
    styles: {
      width: "calc(100% - 400px)",
      height: "100%",
    },
    classes: ["box-column", "box-y-center", "box-x-start"],
  });

  const wrapper = create({
    type: "box",
    classes: ["box-column", "box-y-start", "box-x-start"],
    styles: {
      width: "100%",
      'max-width': "700px",
      padding: "10px",
      margin: "20px",
    },
  });

  const title = create({
    type: "text",
    classes: ["left_text", "box-y-center", "box-x-between"],
    text: "Nuevo evento: ",
    styles: {
      padding: "9px",
      'padding-left': "20px",
      'padding-right': "20px",
      width: "100%",
      "font-size": ".9em",
      "font-family": "Roboto",
      "min-height": "51px",
      color: "#202020",
      "border-bottom": "1px solid #e9e9e9",
    },
  });
  const right  = create({
    type : 'box',
    classes : ['box-y-center','box-x-end']  
  });

  const save = create({
    type : 'icon',
    classes : ['box-center','accent_hover'],
    text : SAVE({
      fill: '#202020',
      size : '17px'
    }),
    styles : {
      cursor : 'pointer',
      padding: '7px'
    }
  });

  const move = create({
    type : 'icon',
    classes : ['box-center','accent_hover'],
    text : EVENT({
      fill: '#202020',
      size : '17px'
    }),
    styles : {
      cursor : 'pointer',
      padding: '7px'
    }
  });

  move.appendTo(right.element);
  save.appendTo(right.element);
  right.appendTo(title.element);

  const row1 = create({
    type: "row",
    classes: ["box-row", "box-x-start", "box-y-center"],
    styles: {
      "min-height": "35px",
      width: "100%",
    },
  });

  const titleInput = materialInput({
    title: "Título",
    type: "text",
    id: "title",
    width: "200px",
    events: {
      input: () => console.log(),
    },
    svg: INFO({
      fill: "#C5C5C5",
      size: "20px",
    }),
  });

  const hourInput = materialInput({
    title: "Hora",
    type: "text",
    id: "hour",
    width: "200px",
    condition: (value) => {
      return true;
    } ,
    error : (value) => {},
    success: (value) => {},
    handler: materialHourChooser({id: "hour"}),
    svg: CLOCK({
      fill: "#C5C5C5",
      size: "20px",
    }),
  });


  const locationInput = materialInput({
    title: "Ubicación",
    type: "text",
    id: "location",
    width: "200px",
    condition: (value) => {
      return value.length < 10
    } ,
    error : (value) => {},
    success: (value) => {},
    svg: LOCATION({
      fill: "#C5C5C5",
      size: "20px",
    }),
  });

  const row2 = create({
    type: "row",
    classes: ["box-row", "box-x-start", "box-y-center"],
    styles: {
      "min-height": "35px",
      "margin-top": "35px",
      width: "100%",
    },
  });

  const type = materialSelect({
    placeholder: "Tipo evento",
    options : [
      { key: 'Formación', value: '0'},
      { key: 'Reserva', value: '1'},
      { key: 'Reunión', value: '2'},
    ],
  });

  titleInput.appendTo(row1.element);
  hourInput.appendTo(row1.element);
  locationInput.appendTo(row1.element);

  type.appendTo(row2.element);

  row1.appendTo(wrapper.element);
  row2.appendTo(wrapper.element);

  title.appendTo(panel.element);
  wrapper.appendTo(panel.element);
  panel.appendTo(view.element);
};
