import { Config } from "../../config/config.js";
import { Text } from "../../lang/text.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import HomeCore from "./home.view.core.js";
import TaxMenu from "./components/home.menu.js";
import { CalculationPanel } from "./components/home.calculation.panel.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";

@Route(["", undefined])
@Singleton()
export default class HomeView extends ViewUI {

    private static readonly ID = "home";
    private static readonly MOBILE_CLASS = "mobile";

    public constructor(){
        super({
            type: HTML.VIEW,
            id: HomeView.ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER], 
        });
        
    }

    public async show(params : string[], container : UIComponent) : Promise<void> {

        this.clean();
        Config.setTitle(`${Config.Base.app_name}`);

        if(Browser.isSmallDevice()){
            this.element.classList.add(HomeView.MOBILE_CLASS);
        }
          

        const images = new UIComponent({
            type : HTML.IMG,
            attributes : {
                src : Config.Path.images + "icon.png",
            },
            styles : {
                width: "8.5rem",
                border: ".35rem solid rgba(0,0,0,.15)",
                borderRadius: "100rem",
                filter : "drop-shadow(0rem 0.25rem .35rem rgba(0,0,0,.25))",
                marginBottom: "1rem"
            }
        });

        const labelContainer = new UIComponent({
            type : HTML.DIV,
            classes : [Gtdf.BOX_ROW, Gtdf.BOX_CENTER]
        });

        const label = new UIComponent({
            type : HTML.P,
            text : "Akrck02"
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
            type : HTML.P,
            text : "This page is being redone from scratch to offer a better experience. Sorry for the inconvenience."
        })

        
        images.appendTo(this);
        labelContainer.appendTo(this);

        this.appendTo(container);
    }
}