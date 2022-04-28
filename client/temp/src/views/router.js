import { Sidebar } from "../components/sidebar/sidebar.js";
import { Configurations } from "../config/config.js";
import { setStyles, UIComponent } from "../lib/gtd-ts/web/uicomponent.js";
import ErrorV from "./error/errorV.js";
import DummyV from "./dummy/dummyView.ui.js";
import Modal from "../components/modal/modal.js";
import HomeView from "./home/home.ui.js";
import SoftwareRouter from "./software/router.js";
import GamesView from "./games/games.ui.js";
import { getMaterialIcon } from "../lib/gtd-ts/material/materialicons.js";
export default class Router {
    constructor(listeners) {
        this.parent = document.getElementById("view-container");
        this.container = new UIComponent({
            type: "div",
            id: "view-container-box",
            styles: {
                width: "calc(100%)",
                height: "100%",
            },
        });
        this.sidebar = new Sidebar();
        this.modal = new Modal();
        this.sidebar.appendTo(this.parent);
        this.container.appendTo(this.parent);
        this.modal.appendTo(document.body);
        const navbar = document.getElementById("os-navbar");
        const navbarTitleBar = document.querySelector("#os-navbar .title-bar");
        const mobileSidebar = document.querySelector("header #mobile-sidebar");
        const icon = getMaterialIcon("menu_open", { size: "1.5rem", fill: "#fff" });
        icon.element.style.cursor = "pointer";
        icon.element.addEventListener("click", () => {
            navbar.style.transition = "height var(--medium)";
            if (navbar.style.height != "15rem") {
                navbar.style.height = "15rem";
                navbar.style.justifyContent = "flex-start";
                mobileSidebar.style.display = "flex";
            }
            else {
                navbar.style.height = "4.1rem";
                navbar.style.padding = ".1rem 2rem";
                navbar.style.alignItems = "center";
                mobileSidebar.style.display = "none";
            }
        });
        navbarTitleBar.appendChild(icon.element);
        setStyles(document.body, {
            backgroundColor: "#151515",
            backgroundSize: "cover",
            backgroundImage: `url(${Configurations.PATHS.WALLPAPERS}/wallpaper.png)`,
        });
    }
    /**
     * Load a view
     * @param {array} params
     */
    load(params) {
        try {
            this.clear();
            switch (params[0]) {
                case undefined:
                case "":
                case "home":
                    new HomeView().show(params.splice(1), this.container);
                    this.sidebar.setSelected(0);
                    break;
                case "software":
                    SoftwareRouter.load(params.splice(1), this.container);
                    this.sidebar.setSelected(1);
                    break;
                case "error":
                    new ErrorV().show(params.splice(1), this.container);
                    break;
                case "dummy":
                    new DummyV().show(params.splice(1), this.container);
                    break;
                case "games":
                    new GamesView().show(params.splice(1), this.container);
                    this.sidebar.setSelected(2);
                    break;
                case "media":
                    this.sidebar.setSelected(3);
                    break;
                default:
                    location.href = Configurations.VIEWS.ERROR + "404";
            }
        }
        catch (e) {
            console.error(e);
        }
        ;
    }
    /** show a view */
    clear() {
        this.container.element.innerHTML = "";
    }
}
