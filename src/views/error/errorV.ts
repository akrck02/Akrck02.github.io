import { CONFIG, VIEWS } from "../../config/config.js";
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
            transition: ".25s",
            opacity: "0",
        }
    });

    const message = new UIComponent({
        type : "hp",
        text : "ERROR " + error.code + ": " + error.description,
        styles : {
            width: "80%",
            maxWidth: "500px",
            textAlign: "center",
            fontSize: "1.5em",
            margin: "15px 0",
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

    const back = new UIComponent({
        type : "button",
        text : "Back to home",
        styles : {
            width: "100%",
            maxWidth: "150px",
            marginTop: "5px",
            marginBottom: "5px",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0px 2px 4px rgba(0,0,0,.15)",
            textAlign: "center",
            fontWeight: "bold", 
            cursor: "pointer",  
        },
        events : {
            click : () =>{
                location.href = VIEWS.BASE_URL;
            }
        }
    });

    setTimeout(() => {
        view.element.style.opacity = "1";
    }, 200);

    picture.appendTo(view);
    message.appendTo(view);
    back.appendTo(view);

    view.appendTo(document.body);

}