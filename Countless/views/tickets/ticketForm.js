import { materialInput } from "../../components/materialInput.js";
import { miniCalendar, selectMinicalendarDay } from "../../components/miniCalendar.js";
import { currentDay, currentYear } from "../../core/monthCalc.js";
import {
    create,
    setClasses,
    setEvents,
    setStyles
} from "../../lib/GTD_Component.js";
import { EURO, EVENTS, RECEIPT } from "../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { STYLES } from "../configuration/styles.js";

export const ticketForm = (draft) => {
  const form = isSmallDevice() ? mobileForm(draft) : desktopForm(draft);
  return form;
};

const mobileForm = (draft) => {
  const form = create({
    type: "box",
    id: "ticketform",
    classes: ["box-column", "box-y-center"],
    styles: {
      opacity: 0,
    },
  });

  const infobar = infoBar(draft);
  const day = materialInput({
    title: "Día",
    type: "date",
    scale: 1.2,
    svg: EVENTS({
      fill: STYLES.COLORS.GRAY,
      size: "20px",
    }),
    error: (value) => {},
    success: (value) => {},
  });

  const number = materialInput({
    title: "Numero de tickets",
    type: "number",
    scale: 1.2,
    svg: RECEIPT({
      fill: STYLES.COLORS.GRAY,
      size: "20px",
    }),
    condition: (value) => {
      return +value >= 0;
    },
    error: (value) => {},
    success: (value) => {},
  });

  const euros = materialInput({
    title: "Euros",
    type: "number",
    scale: 1.2,
    svg: EURO({
      fill: STYLES.COLORS.GRAY,
      size: "20px",
    }),
    condition: (value) => {
      return +value >= 0;
    },
    error: (value) => {},
    success: (value) => {},
  });

  infobar.appendTo(form.element);

  day.appendTo(form.element);
  number.appendTo(form.element);
  euros.appendTo(form.element);

  return form;
};

const desktopForm = (draft) => {
  const form = create({
    type: "box",
    id: "ticketform",
    classes: ["box-column"],
    styles: {
      opacity: 0,
    },
  });

  const infobar = infoBar(draft);
  const rowOne = create({classes: ["box-row", "box-x-start"],});
  const right = create({classes: ["box-row", "box-x-start"],});
  
  const minicalendar = miniCalendar(
    currentYear(),
    draft.month,
    currentDay(),
    (comp) => {
      selectMinicalendarDay(comp.dataset.day)
      comp.element.classList.add("selected");
      updateValues(draft, comp.dataset.day);
    }
  );

  const number = materialInput({
    title: "Numero de tickets",
    type: "number",
    id: "tickets",
    default: "0",
    svg: RECEIPT({
      fill: STYLES.COLORS.GRAY,
      size: "20px",
    }),
    condition: (value) => {
      return +value >= 0;
    },
    error: (value) => {},
    success: (value) => {},
  });
  setClasses(number.element, ["filled"]);

  setEvents(number.getInput(), {
    input: () => {
      const input = number.getInput();
      input.value = Math.abs(input.value);
      draft.info[minicalendar.getSelected()].number = input.value;

      changeIdSequence(draft, 0);
      const last = document.querySelector("#lastID");
      //calculate last

      last.innerHTML = "Vendidos : " + draft.lastID;
    },
  });

  const euros = materialInput({
    title: "Euros",
    type: "number",
    id: "euros",
    default:  draft.info[minicalendar.getSelected()].price || "0",
    svg: EURO({
      fill: STYLES.COLORS.GRAY,
      size: "20px",
    }),
    condition: (value) => {
      return +value >= 0;
    },
    error: (value) => {},
    success: (value) => {},
  });
  setClasses(euros.element, ["filled"]);

  setEvents(euros.element.querySelector("input"), {
    input: () => {
      const input = euros.getInput();
      input.value = Math.abs(input.value);
      draft.info[minicalendar.getSelected()].price = input.value;

      const total = document.querySelector("#total");
      total.innerHTML = "Total : " + calculateTotal(draft).toFixed(2) + "€";
    },
  });

  setStyles(minicalendar.element, {
    margin: "20px",
    marginLeft: "0px",
  });

  infobar.appendTo(form.element);
  
  number.appendTo(right.element);
  euros.appendTo(right.element);

  minicalendar.appendTo(rowOne.element);
  right.appendTo(rowOne.element);

  rowOne.appendTo(form.element);
  return form;
};

/**
 * Update input values
 * @param {*} draft
 */
const updateValues = (draft, daynumber) => {
  const tickets = document.querySelector("#inputtickets input");
  const euros = document.querySelector("#inputeuros input");

  tickets.value = draft.info[daynumber].number;
  euros.value = draft.info[daynumber].price;
};

const infoBar = (draft) => {
  const comp = create({
    classes: ["box-row"],
    styles: {
      marginTop: "20px",
    },
  });

  const monthTotal = create({
    text: "Total : " + draft.total + "€",
    classes: ["box-row", "box-y-center"],
    id: "total",
    styles: {
      fontFamily: STYLES.FONTS.ROBOTO_BOLD,
      height: "35px",
      padding: "10px",
      background: STYLES.COLORS.BORDER_GRAY,
    },
  });

  const lastTicketNumber = create({
    text: "Vendidos : " + draft.lastID,
    classes: ["box-row", "box-y-center"],
    id: "lastID",
    styles: {
      marginLeft: "5px",
      height: "35px",
      padding: "10px",
      background: STYLES.COLORS.BORDER_GRAY,
    },
  });

  monthTotal.appendTo(comp.element);
  lastTicketNumber.appendTo(comp.element);

  return comp;
};

/**
 * Change the id sequence
 */
const changeIdSequence = (draft, lastID) => {
  let last = +lastID + 1;
  for (const day in draft.info) {
    const number = draft.info[day].number;
    for (let i = 1; i <= number; i++) {
      draft.info[day].id[i] = last;
      last++;
    }
  }
  draft.lastID = last - 1;
  console.log(draft);
};

/**
 * Calculate price total
 * @param {*} draft  - The month ticket's draft
 * @returns Total price
 */
const calculateTotal = (draft) => {
  let total = 0;
  for (const day in draft.info) {
    total += +draft.info[day].price;
  }

  return total;
};
