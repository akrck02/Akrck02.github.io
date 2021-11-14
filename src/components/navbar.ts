import { VIEWS } from "../config/config.js";
import { UIComponent } from "../lib/gtd/web/uicomponent.js";

export class Navbar {

    private component : UIComponent;    
    private entries : { [key: string] : string };
    private selected : number;

    constructor() {
        this.entries = {}; 
        this.component = new UIComponent({
            type: "div",
            classes: [],
            attributes: {},
            styles: {
                background : "#F6F6F6",
                width : "100%",
                padding: "10px",
                justifySelf: "flex-end",
            },
        });
    } 

    public addEntry(key : string, value : string) : void {
        this.entries[key] = value;
    }

    public select(index : number) : void {
        this.selected = index;
    }

    public show(parent : UIComponent) : void {

        let entries = Object.keys(this.entries);
        entries.forEach(entry => {
            const url = this.entries[entry];
            const element = new UIComponent({
                type: "a",
                text: entry,
                classes: [],
                attributes: {
                    href: url,
                },
                styles: {
                    color: "#404040",
                    padding: "10px",
                },
            });

            if (this.selected === entries.indexOf(entry)) {
                element.element.style['fontWeight'] = "900";
            }

            element.appendTo(this.component);
        });

        this.component.appendTo(parent);
    }

}    

export const getNavbar = () => {
    const DEFAULT_NAVBAR = new Navbar();
    DEFAULT_NAVBAR.addEntry("home", VIEWS.BASE_URL);
    DEFAULT_NAVBAR.addEntry("code", VIEWS.CODE);
    DEFAULT_NAVBAR.addEntry("games", VIEWS.GAMES);
    DEFAULT_NAVBAR.addEntry("media", VIEWS.MEDIA);
    DEFAULT_NAVBAR.addEntry("about", VIEWS.ABOUT);

    return DEFAULT_NAVBAR;
}