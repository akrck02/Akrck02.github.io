import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export default class DummyView extends UIComponent {
    constructor() {
        super({
            type: "view"
        });
    }
    show(params, container) {
        this.appendTo(container);
    }
}
