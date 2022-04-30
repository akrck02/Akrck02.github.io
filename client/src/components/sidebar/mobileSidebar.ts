import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";

export default class MobileSidebar extends UIComponent {

    private title: UIComponent;
    private buttonBar: UIComponent;
    private elements: UIComponent[];
    private opened: boolean;

    public constructor() {
        super({
            type: "div",
            classes: ["box-column", "box-y-center"],
        });

        this.opened = false;
        this.element = document.querySelector("header") as HTMLElement;
        this.build();
    }

    public build() {

        this.clean();

        const titleBar = new UIComponent({
            type: "div",
            id: "title-bar",
            classes: ["box-y-center", "box-row", "box-x-between"],
        });

        const title = new UIComponent({
            type: "h1",
            classes: ["title"],
        });

        this.title = title;
        titleBar.appendChild(title);


        const icon = getMaterialIcon("menu_open", { size: "1.5rem", fill: "#fff" });
        icon.element.style.cursor = "pointer";
        //icon.element.addEventListener("click", () => this.toggle());
        titleBar.element.addEventListener("click", () => this.toggle());

        let touchPos;

        titleBar.element.ontouchstart = function(e){
            touchPos = e.changedTouches[0].clientY;
        }            


        titleBar.element.ontouchmove = (e:any) =>{

         
            let newTouchPos = e.changedTouches[0].clientY;
            if (newTouchPos > touchPos + 50) {
                this.element.style.transition = "height var(--medium)";
                this.close();
            }else if(newTouchPos < touchPos - 50) {
                this.element.style.transition = "height var(--medium)";
                this.open();
            }

        }


        titleBar.appendChild(icon);

        this.buttonBar = new UIComponent({
            type: "div",
            id: "mobile-sidebar",
        });

        this.appendChild(titleBar);
        this.appendChild(this.buttonBar);
        this.elements = [];

    }


    public setSelected(index: number) {
        this.elements.forEach(element => {
            element.element.classList.remove("selected");
        });

        if (index > this.elements.length - 1) {
            index = this.elements.length - 1;
        }


        if (index >= 0) {
            this.elements[index].element.classList.add("selected");
        }
    }

    public setTitle(title: string) {
        this.title.element.innerHTML = title;
    }

    public addIcon(icon: UIComponent): void {
        this.elements.push(icon);
        this.buttonBar.appendChild(icon);
    }

    public toggle(): void {
        this.element.style.transition = "height var(--medium)";

        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    public open(): void {
        this.element.style.height = "20rem"
        this.element.style.justifyContent = "flex-start";
        this.buttonBar.element.style.display = "flex";
        this.opened = true;

        document.documentElement.dataset.menuOpen = "true";
    }

    public close(): void {
        this.element.style.height = "4.1rem";
        this.element.style.padding = ".1rem 2rem";
        this.element.style.alignItems = "center";
        this.buttonBar.element.style.display = "none";
        this.opened = false;

        document.documentElement.dataset.menuOpen = "false";
    }
} 