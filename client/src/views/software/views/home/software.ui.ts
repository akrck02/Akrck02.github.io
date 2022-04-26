import { Configurations } from "../../../../config/config.js";
import { UIComponent } from "../../../../lib/gtd-ts/web/uicomponent.js";

export default class SoftwareView extends UIComponent {

    public constructor(){
        super({
            type: "view",
            id: "software-view",
            classes: ["box-column","box-center"],
            styles: {
                padding: "1rem",
                width: "100%",
                height: "100%",
            }
        });
    }

    public show(params : string[], container : UIComponent) : void {

        const valhalla = new UIComponent({
            type: "a",
            id: "valhalla-link",
            text: "Valhalla",
            attributes: {
                href: Configurations.VIEWS.SOFTWARE + "/valhalla",
            },
            styles: {
                fontSize: "1rem",
                backgroundColor: "rgba(255,255,255,.15)",
                padding: "1rem",
                borderRadius: ".35rem",
                color: "white",
            }
        });
            
        this.appendChild(valhalla);
        container.appendChild(this);
    }

}