import { Configurations } from "../../../../config/config.js";
import { getOs } from "../../../../lib/gtd-ts/web/responsivetools.js";
import { UIComponent } from "../../../../lib/gtd-ts/web/uicomponent.js";

export default class ValhallaView extends UIComponent {

    public constructor(){
        super({
            type: "view",
            id: "valhalla-view",
            classes: ["box-column"],
            styles: {
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
            }
        });

        this.element.style.setProperty("--background-image","url(/client/" + Configurations.PATHS.WALLPAPERS + "wall1.png)",);
    }

    public show(params : string[], container : UIComponent) : void {

        const section = this.buildPresentationSection();
        const task = this.buildTaskSection();
        const notes = this.buildNoteSection();

        this.appendChild(section);
        this.appendChild(task);
        this.appendChild(notes);

        container.appendChild(this);
    }

    public buildPresentationSection() : UIComponent {

        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-presentation",
            classes: ["box-row","box-center","section"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                backgroundColor: "rgba(0,0,0,.55)",
            }
        });

        const downloadPanel = new UIComponent({
            type: "div",
            id: "download-panel",
            classes: ["box-column","box-center"],
        });

        const image = new UIComponent({
            type: "img",
            id: "download-image",
            attributes: {
                src: Configurations.PATHS.IMAGES + "valhalla-1.png",
            },
            styles: {
                width: "40%",
                borderRadius: ".35rem",
                marginLeft: "5rem",
                boxShadow: "0 0 .5rem .5rem rgba(0,0,0,.15)",
            }
        });

        const logo = new UIComponent({
            type: "img",
            id: "valhalla-view-logo",
            attributes: {
                src: Configurations.PATHS.ICONS + "valhalla-logo-light.svg",
            },
            styles: {
                width: "10rem",
                top: ".75rem",
                opacity: ".9",
                marginLeft: ".2rem",
            }
        });

        const description = new UIComponent({
            type: "p",
            id: "valhalla-view-description",
            text: "Valhalla - The modern productivity app",
        });

        const os = getOs();

        const downloadWindows = new UIComponent({
            type: "a",
            id: "valhalla-view-download",
            text: "Download for Windows",
            attributes: {
                href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.6b/Valhalla.Setup.1.0.6-b.exe",
            },
            styles: {
                fontSize: ".9rem",
                backgroundColor: "rgba(255,255,255,.1)",
                padding: "1rem",
                borderRadius: ".15rem",
                color: "white",
            }
        });

        const downloadLinux = new UIComponent({
            type: "a",
            id: "valhalla-view-download",
            text: "Download for Linux",
            attributes: {
                href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.6b/Valhalla.Setup.1.0.6-b.AppImage",
            },
            styles: {
                fontSize: ".9rem",
                backgroundColor: "rgba(255,255,255,.1)",
                padding: "1rem",
                borderRadius: ".35rem",
                color: "white",
            }
        });

        const buttonContainer = new UIComponent({
            type: "div",
            id: "valhalla-view-button-container",
            classes: ["box-row","box-center"],
            styles: {
                marginTop: "1.2rem",
            }
        });

        downloadPanel.appendChild(logo);
        downloadPanel.appendChild(description);


        if(os === "Windows"){
            downloadLinux.element.style.background = "transparent";
            downloadLinux.element.innerText = "or Linux";

            buttonContainer.appendChild(downloadWindows);
            buttonContainer.appendChild(downloadLinux);
        } else if(os === "Linux"){
            downloadWindows.element.style.background = "transparent";
            downloadWindows.element.innerText = "or Windows";

            buttonContainer.appendChild(downloadLinux);
            buttonContainer.appendChild(downloadWindows);
        }
        downloadPanel.appendChild(buttonContainer);
        section.appendChild(downloadPanel);
        section.appendChild(image);
        
        return section;
    }


    private buildTaskSection() : UIComponent {

        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-task",
            classes: ["box-row","box-center","section","reverse"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                backgroundColor: "rgba(2,90,255,.01)",
            }
        });

        section.element.style.setProperty("--background-image","url(/client/" + Configurations.PATHS.WALLPAPERS + "wall11.png)",);

        const image = new UIComponent({
            type: "img",
            id: "valhalla-view-task-image",
            attributes: {
                src: Configurations.PATHS.IMAGES + "valhalla-2.png",
            },
            styles: {
                width: "40%",
                borderRadius: ".35rem",
                marginRight: "5rem",
                boxShadow: "0 0 .5rem .5rem rgba(0,0,0,.15)",
            }
        });

        const description = new UIComponent({
            type: "p",
            id: "valhalla-view-task-description",
            text: `
            Valhalla is a modern productivity app that helps you 
            manage your time.
            
            Create tasks, organize them in categories, check out your calendar
            `.replaceAll("\n","<br>"),

            styles: {
                width: "30%",
            }

        });

        section.appendChild(image);
        section.appendChild(description);


        return section;
    }



    private buildNoteSection() {
        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-task",
            classes: ["box-row","box-center","section","reverse"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                backgroundColor: "rgba(2,90,255,.01)",
            }
        });

        section.element.style.setProperty("--background-image","url(/client/" + Configurations.PATHS.WALLPAPERS + "wall13.png)",);


        const description = new UIComponent({
            type: "p",
            id: "valhalla-view-task-description",
            text: `
            Valhalla is a modern productivity app that helps you 
            manage your tasks and projects.
            
            It is a simple, yet powerful tool that can help 
            you manage your tasks and projects.
            `.replaceAll("\n","<br>"),

            styles: {
                width: "30%",
            }
        });

        const image = new UIComponent({
            type: "img",
            id: "valhalla-view-task-image",
            attributes: {
                src: Configurations.PATHS.IMAGES + "valhalla-3.png",
            },
            styles: {
                width: "40%",
                borderRadius: ".35rem",
                marginRight: "5rem",
                boxShadow: "0 0 .5rem .5rem rgba(0,0,0,.15)",
            }
        });

        section.appendChild(description);
        section.appendChild(image);


        return section;

    }


}