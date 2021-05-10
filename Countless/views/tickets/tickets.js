import { bar } from "../../components/bar.js";
import { months } from "../../components/monthBar.js";
import { showAndroidNotification } from "../../core/androidEvents.js";
import { generateDraft } from "../../core/monthTicketFill.js";
import { create } from "../../lib/GTD_Component.js";
import { DOWNLOAD, SAVE } from "../../lib/GTD_MaterialIcons.js";
import { getMonthTicketsService } from "../../services/ticketService.js";
import { STYLES } from "../configuration/styles.js";
import { ticketForm } from "./ticketForm.js";

export let draft;

/**
 * Show the tickets view
 * @param {array} params
 */
export const ticketView = (params) => {
  const web_tittle = "Countless - Tickets";
  window.title = web_tittle;
  document.title = web_tittle;

  const view = create({
    type: "view",
    classes: ["main", "no_copy", "box-column"],
    styles: {
      height: "100vh",
      width: "100vw",
    },
  });

  const titleBar = bar({
    title : "Tickets",
    options : [
      create({
        type : 'icon',
        classes : ['box-center'],
        text : DOWNLOAD({
          fill : "#fff",
          size : "28px" 
        }),
        styles : {
          cursor : 'pointer'
        },
        events : {
          click : () =>{
            showAndroidNotification("Downloading..","Your file is downloading.");
          }
        }
      }),
      create({
        type : 'icon',
        classes : ['box-center'],
        text : SAVE({
          fill : "#fff",
          size : "25px" 
        }),
        styles : {
          margin : '15px',
          cursor : 'pointer'
        },
        events : {
          click : () =>{
            console.info("Saving...");
            console.info(draft);
            document.querySelector("#status").style['borderColor'] = STYLES.COLORS.SUCCESS;
          }
        }
      })
    ]
  });

  const show = create({
    type: "box",
    id: "show",
    classes: ["box-column"],
    styles: {
      margin: "20px",
      height: "92vh",
    },
  });

  const year_dropdown = create({
    type: "select",
    id: "selectYear",
    styles: {
      display: "block",
      width: "100px", 
      border: "none",
      background: "transparent",
      cursor : "pointer"
    },
    events: {
      change: (e) => {
        const select = e.target;
        const option = select.options[select.selectedIndex];
        const monthTab = document.querySelector(".monthTab.selected");
        showTickets(+option.value, +monthTab.dataset.month);
      },
    },
  });

  for (let i = new Date().getFullYear(); i >= 2015; i--) {
    create({
      type: "option",
      text: i,
    }).appendTo(year_dropdown.element);
  }

  const months_title = create({
    type: "h2",
    id : 'status',
    text: "Meses contables:",
    styles: {
      "border-left" : "4px solid " + STYLES.COLORS.ERROR,
      "font-family": "Roboto thin",
      'padding-left' : "10px"
    },
  });

  const optionBar = create({
    classes : ['box-row','box-x-start']
  });

  const regime_dropdown = create({
    type: "select",
    id: "selectRegime",
    styles: {
      display: "block",
      width: "100px", 
      marginLeft : "10px",
      border: "none",
      background: "transparent",
      cursor : "pointer"
    },
    events: {
      change: (e) => {
        const select = e.target;
        const option = select.options[select.selectedIndex];
        //showTickets(+option.value, +monthTab.dataset.month);
      },
    },
  });

  create({
    type: "option",
    text: "Masajes",
  }).appendTo(regime_dropdown.element);

  create({
    type: "option",
    text: "Estética",
  }).appendTo(regime_dropdown.element);

  const months_bar = months();

  titleBar.appendTo(view.element);
  show.appendTo(view.element);

  year_dropdown.appendTo(optionBar.element);
  regime_dropdown.appendTo(optionBar.element);

  months_title.appendTo(show.element);
  optionBar.appendTo(show.element);
  months_bar.appendTo(show.element);
  view.appendTo(document.body);

  prepareEvents();
  document.querySelectorAll(".monthTab")[new Date().getMonth()].click();
};

const prepareEvents = () => {
  const months = document.querySelectorAll(".monthTab");

  months.forEach((tab) => {
    tab.onclick = () => {
      months.forEach((m) => {
        if (m == tab) m.classList.add("selected");
        else {
          m.className = "";
          m.classList.add("tab");
          m.classList.add("monthTab");
          m.classList.add("box-center");
          m.classList.add("center_text");
        }
      });

      const select = document.querySelector("#selectYear");
      const option = select.options[select.selectedIndex];
      showTickets(+option.value, +tab.dataset.month);
    };
  });
};

/**
 * Show tickets of a month
 * @param {*} y - The year
 * @param {*} m - The month
 */
const showTickets = (y, m) => {
  getMonthTicketsService(
    (json) => {
      draft = {};
      if (json.success) draft = json.json;
      else draft = generateDraft(y, m);
      drawDraft(draft, draft.year, draft.month);
    },
    y,
    m + 1
  ); 
};

const drawDraft = (draft, y, m) => {
  const form = ticketForm(draft,y,m);
  const show = document.querySelector("#show");
  const old_table = show.querySelector("#ticketform");

  if (old_table != null) old_table.style.opacity = "0";

  setTimeout(() => {
    if (old_table != null) show.removeChild(old_table);
  }, 100);
  form.appendTo(show);

  setTimeout(() => form.element.style.opacity = 1, 300);
};
