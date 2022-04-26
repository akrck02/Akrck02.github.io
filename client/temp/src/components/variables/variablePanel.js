import { Configurations } from "../../config/config.js";
import { setStyles, UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
export class VariablePanel extends UIComponent {
    constructor() {
        super({
            type: "div",
            id: "variable-panel"
        });
        this.visible = true;
        const title = new UIComponent({
            type: "h1",
            id: "title",
            text: "APP VARIABLES",
        });
        this.logger = new UIComponent({ type: "p" });
        this.appendChild(title);
        this.appendChild(this.logger);
        this.mode = "variables";
        this.viewVars = {};
    }
    start() {
        const terminal = this;
        setInterval(() => this.update(terminal), 250);
    }
    update(terminal) {
        if (!this.visible)
            return;
        this.logger.element.innerHTML = "";
        this.createVariableBar();
    }
    addViewVariables(variables) {
        return this.viewVars = variables;
    }
    hide() {
        this.visible = false;
        setStyles(this.element, {
            opacity: "0",
        });
        setTimeout(() => {
            this.element.style.display = "none";
        }, 100);
    }
    show() {
        this.visible = true;
        setStyles(this.element, {
            display: "flex",
            width: "30rem",
            opacity: "1",
        });
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    createVariableBar() {
        const persistent = new UIComponent({
            type: "h1",
            text: "Storage variables",
            classes: ["log-item-title"]
        });
        const config = Configurations.getConfig();
        persistent.appendTo(this.logger);
        this.createVariableTable(config);
        const base = new UIComponent({
            type: "h1",
            text: "Runtime variables",
            classes: ["log-item-title"]
        });
        base.appendTo(this.logger);
        const baseConfig = Configurations.BASE;
        this.createVariableTable({
            "APP_NAME": baseConfig.APP_NAME,
            "APP_VERSION": baseConfig.APP_VERSION,
            "ENVIROMENT": baseConfig.ENVIRONMENT,
            "DEBUG": baseConfig.DEBUG,
            "LOG_LEVEL": baseConfig.LOG_LEVEL,
            "THEME": Configurations.getTheme(),
            "VIEW": location.href.substring(location.href.indexOf("#") + 1),
        });
        if (this.viewVars && Object.keys(this.viewVars).length != 0) {
            const view = new UIComponent({
                type: "h1",
                text: "View variables",
                classes: ["log-item-title"]
            });
            view.appendTo(this.logger);
            this.createVariableTable(this.viewVars);
        }
    }
    createVariableTable(config) {
        for (const key in config) {
            let value = config[key];
            const logItem = new UIComponent({
                type: "span",
                classes: ["log-item"],
            });
            const logTable = new UIComponent({
                type: "table",
                classes: ["log-table"],
            });
            const logRow = new UIComponent({
                type: "tr",
                classes: ["log-row"],
            });
            const keyCol = new UIComponent({
                type: "td",
                styles: {
                    maxHeight: "1.5rem",
                    verticalAlign: "middle",
                },
                text: key,
                classes: ["key"]
            });
            if (value === undefined)
                value = "undefined";
            //if value is an object, we need to parse it
            if (typeof value === "object") {
                value = JSON.stringify(value);
            }
            if (value === 0) {
                value = value.toString();
            }
            const valueCol = new UIComponent({
                type: "td",
                text: value,
                classes: ["value"]
            });
            logTable.appendChild(logRow);
            logRow.appendChild(keyCol);
            logRow.appendChild(valueCol);
            logItem.appendChild(logTable);
            this.logger.appendChild(logItem);
        }
    }
}
