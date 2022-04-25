import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";

export default class HomeView extends UIComponent {
   
    public constructor() {
        super({
            type : "view",
            id : "home",
            classes: ["box-center"],
            styles : {
                padding: "1rem",
                height: "100%",
                width: "100%"
            }
        });
    }

    public show(params : string[], container : UIComponent): void {

        const helloWorld = new UIComponent({
            text: "Hello world"
        })

        helloWorld.appendTo(this)

        this.appendTo(container);
    }

}