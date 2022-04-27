import { Configurations } from "../../config/config.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
import SoftwareView from "./views/home/software.ui.js";
import ValhallaView from "./views/valhalla/valhalla.ui.js";

export default class SoftwareRouter {

    public static load (params : string[], container : UIComponent) {
    
        try{
            container.clean();
            switch (params[0]) {
                case undefined:
                case "search":
                case "" :
                    new SoftwareView().show(params.splice(1), container);
                    break;
                case "valhalla":
                    new ValhallaView().show(params.splice(1), container);
                    break;
                default:
                    location.href = Configurations.VIEWS.HOME;
            }

        } catch (e) {
            console.error(e);
        };

    }
    


}