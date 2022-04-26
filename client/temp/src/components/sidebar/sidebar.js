import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export class Sidebar extends UIComponent {
    constructor() {
        super({
            type: "div",
            id: "sidebar",
            classes: ["box-column", "box-y-center"],
        });
        this.buttonBar = new UIComponent({
            type: "div",
            classes: ["box-y-center", "box-column"],
            styles: {
                height: "calc(100% - 2.5rem)",
                width: "100%",
            }
        });
        this.build();
        this.appendChild(this.buttonBar);
    }
    build() {
        const home = new UIComponent({
            type: "a",
            classes: ["sidebar-item", "box-center"],
            text: getMaterialIcon("home", {
                size: "1.25rem",
                fill: "#404040",
            }).toHTML(),
            attributes: {
                href: Configurations.VIEWS.HOME,
            },
        });
        const dummy = new UIComponent({
            type: "a",
            classes: ["sidebar-item", "box-center"],
            text: getMaterialIcon("code", {
                size: "1.25rem",
                fill: "#404040",
            }).toHTML(),
            attributes: {
                href: Configurations.VIEWS.SOFTWARE,
            },
        });
        this.elements = [home, dummy];
        this.elements.forEach((element) => {
            this.buttonBar.appendChild(element);
        });
    }
    setSelected(index) {
        this.elements.forEach(element => {
            element.element.classList.remove("selected");
        });
        if (index > this.elements.length - 1) {
            index = this.elements.length - 1;
        }
        if (index >= 0) {
            this.elements[index].element.classList.add("selected");
        }
    }
    show() {
    }
    ;
}
