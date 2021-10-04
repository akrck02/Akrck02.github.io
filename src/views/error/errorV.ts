import { CONFIG } from "../../config/config.js";
import { ERRORS } from "../../config/errors.js";
import { getParametersByBreakPoint } from "../../lib/gtd/data/urltools.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";

export default function show(params : string[]) : void {
    let title = CONFIG.APP_NAME + " - Media";
    document.title = title;

    const errorCode = params[1];
    const error = ERRORS[errorCode];

    const view = new UIComponent({
        type : "view",
        styles : {
            display : "flex",
            flexDirection: "column",
            width : "100%",
            height : "100%", 
            justifyContent: "center",
            alignItems: "center",
        }
    });

    const message = new UIComponent({
        type : "h1",
        text : "ERROR " + error.code + ": " + error.description,
        styles : {
            width: "80%",
            maxWidth: "500px",
            textAlign: "center"
        }
    });

    const picture = new UIComponent({
        type : "img",
        styles : {
            maxWidth : "250px",
            height : "250px",
            objectFit : "cover",
            borderRadius : "300px",
            filter: "grayscale(100)",
            boxShadow : "0px 2px 4px rgba(0,0,0,.15)"
        },
        attributes : {
            src : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FI2mzGCRrLrY%2Fmaxresdefault.jpg&f=1&nofb=1"
        }
    });

    picture.appendTo(view);
    message.appendTo(view);


    view.appendTo(document.body);

}