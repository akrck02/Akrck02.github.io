import { Sidebar } from "../components/sidebar/sidebar.js";
import { Configurations } from "../config/config.js";
import { ListenerSet } from "../core/listenerset.js";
import { UIComponent } from "../lib/gtd-ts/web/uicomponent.js";
import ErrorV from "./error/errorV.js";
import DummyV from "./dummy/dummyView.ui.js";

import Modal from "../components/modal/modal.js";
import HomeView from "./home/home.ui.js";
import SoftwareRouter from "./software/router.js";

export default class Router {

    public parent : HTMLElement;
    public sidebar : Sidebar;
    public modal : Modal;
    public container : UIComponent;

    constructor(listeners : ListenerSet) {

        this.parent = document.getElementById("view-container") as HTMLElement;
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
    }
    /**
     * Load a view
     * @param {array} params
     */
    public load (params : string[]) {
    
        try{
            this.clear();

            switch (params[0]) {
            
                case undefined:
                case "":
                case "home":
                    new HomeView().show(params.splice(1), this.container);
                    this.sidebar.setSelected(0);
                    break;

                case "software" : 
                    SoftwareRouter.load(params.splice(1), this.container);
                    this.sidebar.setSelected(1);
                    break;
                case "error":
                    new ErrorV().show(params.splice(1), this.container);
                    break;
                case "dummy":
                    new DummyV().show(params.splice(1), this.container);
                    break;
                default:
                    location.href = Configurations.VIEWS.ERROR;
            }

        } catch (e) {
            console.error(e);
        };

    }
    
    /** show a view */
    public clear() {
        this.container.element.innerHTML="";
    }
}
