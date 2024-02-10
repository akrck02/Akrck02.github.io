var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeView_1;
import { Config } from "../../config/config.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
let HomeView = HomeView_1 = class HomeView extends ViewUI {
    constructor() {
        super({
            type: HTML.VIEW,
            id: HomeView_1.ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
        });
    }
    async show(params, container) {
        this.clean();
        Config.setTitle(`${Config.Base.app_name}`);
        if (Browser.isSmallDevice()) {
            this.element.classList.add(HomeView_1.MOBILE_CLASS);
        }
        const images = new UIComponent({
            type: HTML.IMG,
            attributes: {
                src: Config.Path.images + "icon.png",
            },
            styles: {
                width: "8.5rem",
                border: ".35rem solid rgba(0,0,0,.15)",
                borderRadius: "100rem",
                filter: "drop-shadow(0rem 0.25rem .35rem rgba(0,0,0,.25))",
                marginBottom: "1rem"
            }
        });
        const labelContainer = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER]
        });
        const label = new UIComponent({
            type: HTML.P,
            text: "Akrck02"
        });
        label.appendTo(labelContainer);
        // const loginButton = new UIComponent({
        //     type : HTML.BUTTON,
        //     text : MaterialIcons.get("back",{
        //         fill : "#fff",
        //         size : "1rem"
        //     }).toHTML(),
        //     styles : {
        //         margin : "0",
        //         marginLeft : "1rem",
        //         borderRadius : ".65rem",
        //         transform: "rotate(180deg)"
        //     }
        // });
        // loginButton.appendTo(labelContainer);
        const text = new UIComponent({
            type: HTML.P,
            text: "This page is being redone from scratch to offer a better experience. Sorry for the inconvenience."
        });
        images.appendTo(this);
        labelContainer.appendTo(this);
        this.appendTo(container);
    }
};
HomeView.ID = "home";
HomeView.MOBILE_CLASS = "mobile";
HomeView = HomeView_1 = __decorate([
    Route(["", undefined]),
    Singleton(),
    __metadata("design:paramtypes", [])
], HomeView);
export default HomeView;
