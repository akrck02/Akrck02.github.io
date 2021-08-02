import { create } from "../../lib/GTD_Component.js";

export const homeV = () => {
    const view = create({
        text: "Home"
    });

    view.appendTo(document.body);
};