import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export default class GamesView extends UIComponent {
    constructor() {
        super({});
    }
    show(params, container) {
        container.appendChild(this);
    }
}
