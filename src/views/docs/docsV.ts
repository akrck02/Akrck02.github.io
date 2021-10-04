import { CONFIG } from "../../config/config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";

export default function docsV (params : string[]) : void {
    let title = CONFIG.APP_NAME + " - Docs";
    document.title = title;

    const view = new UIComponent({
        type : "view",
        styles : {
            display : "flex",
            width : "100%",
            height : "100%",
            justifyContent: "center",
            alignItems : "center",
        }
    });
    
    view.appendTo(document.body);
}