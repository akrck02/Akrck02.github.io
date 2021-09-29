import { CLASS } from "../core/css.js";
import { isSmallDevice } from "../lib/gtd/web/responsivetools.js";
import { UIComponent, UIProperties } from "../lib/gtd/web/uicomponent.js";

export interface IconButtonProperties extends UIProperties{
    icon ?: string,
    title ?: string,
    color ?: string,
    bold ?: boolean,
    accent ?: string;
    index ?: number;
}

export default class IconButton {

    private component : UIComponent;

    constructor(properties : IconButtonProperties) {
    
        this.component = new UIComponent({
            type: "div",
            classes: [CLASS.HOME_BUTTON],
            events: properties.events || {},
            styles : isSmallDevice() ? {
                padding : "0px",
                width : "0%"
            }:{}
        });

        const icon = new UIComponent({
            text: properties.icon,
        });

        const title = new UIComponent({
            text: properties.title,
            styles: {
              fontSize: isSmallDevice()? ".9em" : "1.2em",
              fontWeight: properties.bold ? "bold" : "",
              color: properties.color || "#404040"
            },
        });

        if(properties.accent) 
            this.component.element.style.setProperty("--accent_color", properties.accent);

        if(properties.index) 
            this.component.element.setAttribute("tabindex", properties.index + "");

        icon.appendTo(this.component);
        title.appendTo(this.component);
    }

    get() : UIComponent {
        return this.component;
    }
}