import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";

export default class GamesView extends UIComponent {
    
    public constructor() {
        super({

        });
    }


    public show(params : string[], container : UIComponent) {


        container.appendChild(this);

    }
}