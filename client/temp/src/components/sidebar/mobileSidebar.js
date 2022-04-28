import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export default class MobileSidebar extends UIComponent {
    constructor() {
        super({
            type: "div",
            classes: ["box-column", "box-y-center"],
        });
        this.opened = false;
        this.element = document.querySelector("header");
        this.build();
    }
    build() {
        this.clean();
        const titleBar = new UIComponent({
            type: "div",
            id: "title-bar",
            classes: ["box-y-center", "box-row", "box-x-between"],
        });
        const title = new UIComponent({
            type: "h1",
            classes: ["title"],
        });
        this.title = title;
        titleBar.appendChild(title);
        const icon = getMaterialIcon("menu_open", { size: "1.5rem", fill: "#fff" });
        icon.element.style.cursor = "pointer";
        icon.element.addEventListener("click", () => this.toggle());
        titleBar.appendChild(icon);
        this.buttonBar = new UIComponent({
            type: "div",
            id: "mobile-sidebar",
        });
        this.appendChild(titleBar);
        this.appendChild(this.buttonBar);
        this.elements = [];
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
    setTitle(title) {
        this.title.element.innerHTML = title;
    }
    addIcon(icon) {
        this.elements.push(icon);
        this.buttonBar.appendChild(icon);
    }
    toggle() {
        this.element.style.transition = "height var(--medium)";
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        this.element.style.height = "20rem";
        this.element.style.justifyContent = "flex-start";
        this.buttonBar.element.style.display = "flex";
        this.opened = true;
    }
    close() {
        this.element.style.height = "4.1rem";
        this.element.style.padding = ".1rem 2rem";
        this.element.style.alignItems = "center";
        this.buttonBar.element.style.display = "none";
        this.opened = false;
    }
}
