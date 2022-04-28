import { Configurations } from "../../../../config/config.js";
import { getMaterialIcon } from "../../../../lib/gtd-ts/material/materialicons.js";
import { setEvents, setStyles, UIComponent } from "../../../../lib/gtd-ts/web/uicomponent.js";
import Router from "../../../router.js";
import SoftwareCore from "./software.core.js";
export default class SoftwareView extends UIComponent {
    constructor() {
        super({
            type: "view",
            id: "software-view",
            classes: ["box-row"],
        });
    }
    show(params, container) {
        const navbar = new UIComponent({
            type: "navbar",
            id: "software-view-navbar",
        });
        this.selected = params[0] || "all";
        const tech = SoftwareCore.getTechnologies();
        const langs = SoftwareCore.getLangs();
        const all = this.createNavbarItem("all");
        navbar.appendChild(all);
        langs.forEach((lang) => {
            const item = this.createNavbarItem(lang);
            navbar.appendChild(item);
        });
        tech.forEach((tech) => {
            const item = this.createNavbarItem(tech);
            navbar.appendChild(item);
        });
        this.techContainer = new UIComponent({
            type: "div",
            id: "tech-container",
            classes: ["box-row", "box-x-center"],
            styles: {
                padding: "1rem",
            }
        });
        this.showTechByCategory(params[0]);
        this.appendChild(navbar);
        this.appendChild(this.techContainer);
        container.appendChild(this);
        setTimeout(() => this.element.style.opacity = "1", 40);
    }
    createNavbarItem(name) {
        const item = new UIComponent({
            type: "div",
            classes: ["box-x-between", "box-row", "navbar-item"],
        });
        const nameComp = new UIComponent({
            type: "div",
            text: name,
        });
        item.appendChild(nameComp);
        setEvents(item.element, {
            click: (e) => {
                this.showTechByCategory(name);
                item.element.classList.add("selected");
                const navbarItems = document.querySelectorAll(".navbar-item");
                for (let i = 0; i < navbarItems.length; i++) {
                    if (navbarItems[i] !== item.element) {
                        navbarItems[i].classList.remove("selected");
                    }
                }
            }
        });
        if (name === this.selected) {
            item.element.classList.add("selected");
        }
        if (name !== "all") {
            const icon = new UIComponent({
                type: "img",
                id: "software-view-navbar-item-icon",
                attributes: {
                    src: Configurations.PATHS.ICONS + name.replace("#", "sharp") + ".svg",
                    alt: name,
                    title: name,
                },
            });
            item.appendChild(icon);
        }
        else {
            const icon = getMaterialIcon("all_inclusive", {
                size: "1.5rem",
                fill: "#fff",
            });
            icon.element.id = "all-icon";
            icon.element.title = "All";
            item.appendChild(icon);
        }
        return item;
    }
    showTechByCategory(category) {
        this.selected = category;
        Router.setTitle("Software" + (category ? " / " + category : ""));
        this.techContainer.clean();
        setStyles(this.techContainer.element, {
            transition: "none",
            opacity: "0",
        });
        const projectsByCategory = SoftwareCore.getProjectsByCategory(category);
        for (const name in projectsByCategory) {
            const project = projectsByCategory[name];
            const projectComp = new UIComponent({
                type: "a",
                classes: ["box-center", "box-column", "project"],
                attributes: {
                    href: project.url || "https://github.com/" + project.github,
                    target: project.url ? "" : "_blank"
                },
            });
            const title = new UIComponent({
                text: name,
                styles: {
                    fontSize: ".75rem",
                }
            });
            if (project.icon) {
                const logo = new UIComponent({
                    type: "img",
                    attributes: {
                        src: project.icon,
                    },
                    styles: {
                        width: "4rem",
                        height: "4rem",
                        filter: "drop-shadow(0 .2rem .2rem rgba(0,0,0,.35))"
                    }
                });
                projectComp.appendChild(logo);
            }
            else {
                const defaultIcon = getMaterialIcon("code", {
                    fill: "#fff",
                    size: "2.5rem"
                });
                setStyles(defaultIcon.element, {
                    marginBottom: "1rem",
                    padding: ".5rem"
                });
                projectComp.appendChild(defaultIcon);
            }
            projectComp.appendChild(title);
            this.techContainer.appendChild(projectComp);
            setTimeout(() => {
                setStyles(this.techContainer.element, {
                    transition: "opacity var(--slow)",
                    opacity: "1",
                });
            }, 50);
        }
    }
}
