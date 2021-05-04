import { materialInput } from "../../components/materialInput.js";
import { create } from "../../lib/GTD_Component.js";
import { EURO, EVENTS, RECEIPT } from "../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";
import { STYLES } from "../configuration/styles.js";

export const ticketForm = (draft) => {
    const form = isSmallDevice() ?  mobileForm(draft) : desktopForm(draft);
    return form;
}

const mobileForm = (draft) => {
    const form = create({
        type: "box",
        id : 'ticketform',
        classes : ['box-column','box-y-center'],
        styles: {
            opacity : 0
        }
    });

    const day = materialInput({
        title : "Día",
        type : "date",
        scale: 1.2,
        svg : EVENTS({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    const number = materialInput({
        title : "Numero de tickets",
        type : "number",
        scale: 1.2,
        svg : RECEIPT({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    const euros = materialInput({
        title : "Euros",
        type : "number",
        scale: 1.2,
        svg : EURO({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    day.appendTo(form.element);
    number.appendTo(form.element);
    euros.appendTo(form.element);

    return form;
}


const desktopForm = (draft) => {
    const form = create({
        type: "box",
        id : 'ticketform',
        classes : ['box-row'],
        styles : {
            opacity : 0
        }
    });

    const day = materialInput({
        title : "Día",
        type : "date",
        scale: 1,
        svg : EVENTS({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    const number = materialInput({
        title : "Numero de tickets",
        type : "number",
        svg : RECEIPT({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    const euros = materialInput({
        title : "Euros",
        type : "number",
        svg : EURO({
            fill: STYLES.COLORS.GRAY,
            size: "20px",
        }) 
    });

    day.appendTo(form.element);
    number.appendTo(form.element);
    euros.appendTo(form.element);

    return form;
}