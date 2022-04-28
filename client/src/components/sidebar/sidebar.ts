import { APP } from "../../app.js";
import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { isMobile, isSmallDevice } from "../../lib/gtd-ts/web/responsivetools.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
import MobileSidebar from "./mobileSidebar.js";

export class Sidebar extends UIComponent {

    private buttonBar : UIComponent;
    private mobileSidebar : MobileSidebar;
    private elements : UIComponent[];

    private static BUTTON_MAP = {
        "home": Configurations.VIEWS.HOME,
        "code": Configurations.VIEWS.SOFTWARE,
        "sport_esports": Configurations.VIEWS.GAMES,
        "movie": Configurations.VIEWS.MEDIA,
    }

    public constructor() {
        super({
            type: "div",
            id: "sidebar",
            classes: ["box-column","box-y-center"],
        });

        this.buttonBar = new UIComponent({
            type: "div",
            classes : ["box-y-center", "box-column"],
            styles: {
                height: "calc(100% - 2.5rem)",
                width : "100%",
            }
        });

        this.mobileSidebar = new MobileSidebar();
        this.build();
        this.appendChild(this.buttonBar);
    
        
    }

    public build() {

        const home = this.createIcon("home",Configurations.VIEWS.HOME)
        const software = this.createIcon("code", Configurations.VIEWS.SOFTWARE);
        const games = this.createIcon("sport_esports", Configurations.VIEWS.GAMES);
        const media = this.createIcon("movie", Configurations.VIEWS.MEDIA);

        this.elements = [];

        for (const iconName in Sidebar.BUTTON_MAP) {
            const path = Sidebar.BUTTON_MAP[iconName];
            const icon = this.createIcon(iconName, path);
            const iconMobile = this.createIcon(iconName, path);

            this.elements.push(icon);

            this.buttonBar.appendChild(icon);
            this.mobileSidebar.addIcon(iconMobile);            
        }      
        
    }

    public createIcon(icon : string, url : string) : UIComponent {

        return new UIComponent({
            type: "a",
            classes: ["sidebar-item","box-center"],
            text: getMaterialIcon(icon,{
                size: "1.25rem",
                fill: "#404040",
            }).toHTML(),
            attributes: { href: url },
        });

    }

    public setSelected(index: number) {

        this.mobileSidebar.setSelected(index);

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

    public getMobile(): MobileSidebar {
        return this.mobileSidebar;
    };

}