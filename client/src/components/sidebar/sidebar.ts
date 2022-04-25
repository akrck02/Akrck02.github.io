import { APP } from "../../app.js";
import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";

export class Sidebar extends UIComponent {

    private buttonBar : UIComponent;
    private userImage : UIComponent;
    private elements : UIComponent[];

    public constructor() {
        super({
            type: "div",
            id: "sidebar",
            classes: ["box-column","box-y-center"],
        });

        this.buttonBar = new UIComponent({
            type: "div",
            styles: {
                height: "calc(100% - 2.5rem)"
            }
        });

        this.userImage = new UIComponent({
            type: "img",
            attributes : {
                src: Configurations.PATHS.ICONS + "/default-user.png"
            },
            styles: {
                width: "1.7rem",
                height: "1.7rem",
                borderRadius: "20rem",
                cursor: "pointer",
            },

        });

        this.build();

        this.appendChild(this.buttonBar);
        this.appendChild(this.userImage);
    }

    public build() {

        const home = new UIComponent({
            type: "a",
            classes: ["sidebar-item","box-center"],
            text: getMaterialIcon("home",{
                size: "1.25rem",
                fill: "#404040",
            }).toHTML(),
            attributes: {
                href: Configurations.VIEWS.HOME,
            },
        });

        const dummy = new UIComponent({
            type: "a",
            classes: ["sidebar-item","box-center"],
            text: getMaterialIcon("science",{
                size: "1.25rem",
                fill: "#404040",
            }).toHTML(),
            attributes: {
                href: Configurations.VIEWS.DUMMY,
            },
        });


        this.elements = [home,dummy];

        this.elements.forEach((element) => {
            this.buttonBar.appendChild(element);
        });
    }

    public setSelected(index: number) {
        this.elements.forEach(element => {
            element.element.classList.remove("selected");
        });

        if(index > this.elements.length - 1){
            index = this.elements.length - 1;
        }


        if(index >= 0){
            this.elements[index].element.classList.add("selected");
        }
    }

    public show(): void {

    };

}