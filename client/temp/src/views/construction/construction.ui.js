import { App } from "../../app.js";
import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export default class ConstructionView extends UIComponent {
    constructor() {
        super({
            type: "view",
            id: "construction-view",
            classes: ["box-column", "box-center"],
            styles: {
                width: "100%",
                height: "100%",
                opacity: "0",
                transition: "opacity var(--medium)",
            },
        });
    }
    show(params, parent) {
        const image = new UIComponent({
            type: "img",
            attributes: {
                src: Configurations.PATHS.IMAGES + "under-construction.png",
                alt: "Construction cat",
            },
            styles: {
                width: "100%",
                maxWidth: "10rem",
                objectFit: "cover",
                filter: "drop-shadow(0px 0px 5px #000)",
            }
        });
        const text = new UIComponent({
            type: "p",
            classes: ["box-row", "box-center"],
            text: App.getBundle().system.THIS_PAGE_IS_UNDER_CONSTRUCTION,
            styles: {
                marginTop: "1rem",
                textAlign: "center",
            }
        });
        const icon = getMaterialIcon("construction", { size: "1.5rem", fill: "#fff" });
        icon.element.style.marginLeft = ".5rem";
        text.appendChild(icon);
        this.appendChild(image);
        this.appendChild(text);
        parent.appendChild(this);
        setTimeout(() => {
            this.element.style.opacity = "1";
        }, 100);
    }
}
