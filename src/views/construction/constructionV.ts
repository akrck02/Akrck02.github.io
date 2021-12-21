import { CONFIG, PATHS } from "../../config/config.js";
import { CLASS } from "../../core/css.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent";

export default class Construction {
    
    
    show(): void {
        let title = CONFIG.APP_NAME;
        document.title = title;
    
        const view = new UIComponent({ 
            classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
            type: "div",
            styles: {
                width: "100%",
                height: "100%",
                background: "#fff",
                transition: ".25s",
                opacity: "0",
            },
        });
    

        const titleBox = new UIComponent({
            classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
            type: "div",
            styles: {
                width: "100%",
                height: "100%",
            }
        });

        const img = new UIComponent({
            classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
            type: "img",
            styles: {
            },
            attributes: {
                src: PATHS.IMAGES + "under-construction.png",
            }
        });

        const titleText = new UIComponent({
            type: "h1",
            text: "website under construction",
            styles: {
                fontSize: "2em",
                fontWeight: "bold",
            }
        });

        img.appendTo(titleBox);
        titleBox.appendChild(titleText);
        view.appendChild(titleBox);
        view.appendTo(document.body);

        setTimeout(() => {
            view.element.style.opacity = "1";
        }, 100);
    }
}