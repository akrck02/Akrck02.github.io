import { App } from "../../../../app.js";
import { Configurations } from "../../../../config/config.js";
import { getMaterialIcon } from "../../../../lib/gtd-ts/material/materialicons.js";
import { getOs, isMobile, isSmallDevice } from "../../../../lib/gtd-ts/web/responsivetools.js";
import { UIComponent } from "../../../../lib/gtd-ts/web/uicomponent.js";
import Router from "../../../router.js";

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
    }

    public show(params : string[], container : UIComponent) : void {

        Router.setTitle("Valhalla");

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
            classes: ["text-center"],
            text: "Valhalla - " + App.getBundle().valhalla.THE_MODERN_PRODUCTIVITY_APP,
        });

        const os = getOs();

        const downloadWindows = new UIComponent({
            type: "a",
            id: "valhalla-view-download",
            text: App.getBundle().valhalla.DOWNLOAD_FOR_WINDOWS,
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
            text: App.getBundle().valhalla.DOWNLOAD_FOR_LINUX,
            attributes: {
                href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.6b/Valhalla-1.0.6-b.AppImage",
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
            downloadLinux.element.innerText = App.getBundle().valhalla.OR_LINUX;

            buttonContainer.appendChild(downloadWindows);
            buttonContainer.appendChild(downloadLinux);
        } else {
            downloadWindows.element.style.background = "transparent";
            downloadWindows.element.innerText = App.getBundle().valhalla.OR_WINDOWS;

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
        });

       
        const image = new UIComponent({
            type: "img",
            id: "screenshot",
            attributes: {
                src: Configurations.PATHS.IMAGES + "valhalla-2.png",
            },
        });

        const box = new UIComponent({
            type: "div",
            classes: ["box-center","box-column"],
            id: "valhalla-view-task-description",
            styles: {
                width: "30%",
            }
        });


        const title = new UIComponent({
            type : "h1",
            text :  App.getBundle().valhalla.ORGANIZE + ", " +
                    App.getBundle().valhalla.SAVE_TIME +
                    ", <br><b class='bold'>" + App.getBundle().valhalla.CREATE + ".</b>",
            styles : {
                lineHeight: "1.5rem",
                textTransform : "uppercase"
            }
        });

        const iconBar = new UIComponent({
            classes: ["box-row"],
            id : "icon-bar",
        });

        const calendar = new UIComponent({
            classes:["box-column","icon"],
        });
        
        const calendarIcon = getMaterialIcon("calendar_today", {
            size: "1.7rem",
            fill: "#fff",
        });

        calendar.appendChild(calendarIcon);
        calendar.appendChild(new UIComponent({
            text: App.getBundle().valhalla.CALENDAR,
            classes : ["text"]
        }));

        const tasks = new UIComponent({
            classes:["box-column","icon"],
        });
        
        const tasksIcon = getMaterialIcon("task_alt", {
            size: "1.7rem",
            fill: "#fff",
        });

        tasks.appendChild(tasksIcon);
        tasks.appendChild(new UIComponent({
            text:  App.getBundle().valhalla.TASKS,
            classes : ["text"]
        }));

        const notes = new UIComponent({
            classes:["box-column","icon"],
        });
        
        const notesIcon = getMaterialIcon("sticky_note_2", {
            size: "1.7rem",
            fill: "#fff",
        });

        notes.appendChild(notesIcon);
        notes.appendChild(new UIComponent({
            text: App.getBundle().valhalla.NOTES,
            classes : ["text"]
        }));

        iconBar.appendChild(calendar);
        iconBar.appendChild(tasks);
        iconBar.appendChild(notes);

        box.appendChild(title);
        box.appendChild(iconBar);

        section.appendChild(image);
        section.appendChild(box);


        return section;
    }



    private buildNoteSection() {
        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-task",
            classes: ["box-row","box-center","section"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",

            }
        });

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