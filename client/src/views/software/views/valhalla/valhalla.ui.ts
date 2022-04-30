import { App } from "../../../../app.js";
import { Configurations } from "../../../../config/config.js";
import { getMaterialIcon } from "../../../../lib/gtd-ts/material/materialicons.js";
import { getOs, isFuckingChrome, isMobile, isSmallDevice } from "../../../../lib/gtd-ts/web/responsivetools.js";
import { setClasses, setEvents, setStyles, UIComponent } from "../../../../lib/gtd-ts/web/uicomponent.js";
import Router from "../../../router.js";

export default class ValhallaView extends UIComponent {

    private section : number;
    private sections : UIComponent[];

    private up : UIComponent;
    private down : UIComponent;
    private scrolling: boolean;

    public constructor(){
        super({
            type: "view",
            id: "valhalla-view",
            classes: ["box-column"],
            styles: {
                width: "100%",
                height: "100%",
                overflowY:  isSmallDevice()? "hidden": "auto",
                overflowX: "hidden",
                opacity : "0",
                transition : "opacity var(--medium)"
            }
        });

        this.section = 0;
        this.sections = [];
        this.scrolling = false;
    }

    public show(params : string[], container : UIComponent) : void {

        Router.setTitle("Valhalla");

        const section = this.buildPresentationSection();
        const task = this.buildTaskSection();
        const notes = this.buildNoteSection();
        const windowsInstallation = this.buildWindowsInstalationSection();
        const windowsInstallationPartTwo = this.buildWindowsInstalationSectionPartTwo();

        this.appendChild(section);
        this.appendChild(task);
        this.appendChild(notes);
        this.appendChild(windowsInstallation);
        this.appendChild(windowsInstallationPartTwo);

        this.sections = [section,task,notes,windowsInstallation,windowsInstallationPartTwo];

        if(isSmallDevice()){
            this.up = getMaterialIcon("expand_less",{
                size: "2rem",
                fill: "#fff"
            })

            this.up.element.id = "up";
            setClasses(this.up.element, ["nav-button"])
            setEvents(this.up.element,{
                click: () => {
                    this.section --;
                    this.goToSection(this.section)
                }
            })

            this.appendChild(this.up);


            // Down button
            this.down = getMaterialIcon("expand",{
                size: "2rem",
                fill: "#fff"
            })

            this.down.element.id = "down";
            setClasses(this.down.element, ["nav-button"])
            setEvents(this.down.element,{
                click: () => {
                    this.section ++;
                    this.goToSection(this.section)
                }
            })
            this.appendChild(this.down);
            this.goToSection(0);


            if(!isFuckingChrome()){
                let touchPos;

                this.element.ontouchstart = function(e){
                    touchPos = e.changedTouches[0].clientY;
                }            

                this.element.ontouchmove = (e: any) => {

                    let newTouchPos = e.changedTouches[0].clientY;
                    if (!this.scrolling && newTouchPos > touchPos + 100) {
                        
                        if(this.section == 0){
                            return;
                        }
                        
                        this.section --;
                        this.scrolling = true;
                        this.goToSection(this.section)
                        setTimeout(() => this.scrolling = false, 80);

                    } else if(!this.scrolling && newTouchPos < touchPos - 100) {

                        if(this.section == this.sections.length  -1 ){
                            return;
                        }

                        this.section ++;
                        
                        this.scrolling = true;
                        this.goToSection(this.section)
                        setTimeout(() => this.scrolling = false, 80);
                    }


                
                }
            }
        }

        container.appendChild(this);
        setTimeout(() => {
            this.element.style.opacity = "1";
        }, 50);
    }

    /**
     * Select a section and scroll into that viewx
     * @param index 
     */
    private goToSection(index : number) {

        if(this.up) {
            this.up.element.style.display  = "flex";
            this.down.element.style.display  = "flex";
        }

        if(index <= 0){
            index = 0;
            if(this.up){
                this.up.element.style.display  = "none";
            }
        }

        if(index >= this.sections.length - 1){
            index = this.sections.length - 1;
            if(this.down){
                this.down.element.style.display  = "none";
            }   
        }

        this.sections[index].element.scrollIntoView();

    }



    /**
     * Build the presentation section
     * @returns The section UIComponent
     */
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
                href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.7b/Valhalla.Setup.1.0.7-b.exe",
            },
            styles: {
                fontSize: ".9rem",
                backgroundColor: "rgba(255,255,255,.1)",
                padding: "1rem",
                borderRadius: ".15rem",
                color: "white",
            },
            events : {
                click : () => {
                    this.section = 3;
                    this.goToSection(this.section);
                }
            }
        });

        const downloadLinux = new UIComponent({
            type: "a",
            id: "valhalla-view-download",
            text: App.getBundle().valhalla.DOWNLOAD_FOR_LINUX,
            attributes: {
                href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.7b/Valhalla-1.0.7-b.AppImage",
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

    /**
     * Build the task section
     * @returns The task section UIComponent
     */
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

    /**
     * Build the notes section 
     * @returns The notes section UIComponent
     */
    private buildNoteSection() {
        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-task",
            classes: ["box-row","box-center","section"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                paddingBottom : "2rem",
            }
        });

        const description = new UIComponent({
            type: "p",
            id: "valhalla-view-task-description",
            styles: {
                width: "30%",
            }
        });


        const offline = getMaterialIcon('wifi_off', {size: "1.7rem", fill: "#fff"})
        offline.element.style.marginRight = "1rem";
        offline.element.style.marginBottom = ".5rem";
        
        const offlineMessage = new UIComponent({
            classes: ["box-x-start", "box-y-center"],
            text: offline.toHTML() + App.getBundle().valhalla.MANAGE_YOUR_TIME_OFFLINE
        })

        const wallpaper = getMaterialIcon("wallpaper", {size: "1.7rem", fill: "#fff"})
        wallpaper.element.style.marginRight = "1rem";
        wallpaper.element.style.marginBottom = ".5rem";

        const wallpaperMessage = new UIComponent({
            classes: ["box-x-start", "box-y-center"],
            text: wallpaper.toHTML() + App.getBundle().valhalla.CUSTOMIZE_YOUR_WALLPAPER
        })


        const langs = getMaterialIcon("translate", {size: "1.7rem", fill: "#fff"})
        langs.element.style.marginRight = "1rem";
        langs.element.style.marginBottom = ".5rem";

        const langsMessage = new UIComponent({
            classes: ["box-x-start", "box-y-center"],
            text: langs.toHTML() + App.getBundle().valhalla.LANGUAGES
        })

        const coffee = getMaterialIcon('coffee', {size: "1.7rem", fill: "#fff"})
        coffee.element.style.marginRight = "1rem";
        coffee.element.style.marginBottom = ".5rem";

        const coffeeMessage = new UIComponent({
            classes: ["box-x-start", "box-y-center"],
            text: coffee.toHTML() + App.getBundle().valhalla.SUPPORT_OPEN_SOURCE_CODE
        })

        description.appendChild(offlineMessage)
        description.appendChild(wallpaperMessage)
        description.appendChild(langsMessage)
        description.appendChild(coffeeMessage)

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


    private buildWindowsInstalationSection() : UIComponent{
        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-windows-installation",
            classes: ["box-column","box-center","section"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                padding: "2rem",
                
            }
        });


        const title = new UIComponent({
            type: "h1",
            text: "Instalación en Windows:", 
            styles: {
                marginBottom: "1rem"
            }
        })

        const container = new UIComponent({
            classes : ["box-row", "box-y-center","win-container"]
        })
        
        const message = new UIComponent({
            type: "p",
            text: App.getBundle().valhalla.WINDOWS_MESSAGE_ONE.replace("$1",`<b class="bold">${App.getBundle().valhalla.NOT_SIGNED_BETA}</b>`)
        })

        const img = new UIComponent({
            type: "img",
            attributes :{
                src : Configurations.PATHS.IMAGES + "win-instalation-warning.jpg"
            },
            styles: {
                marginTop: "3rem", 
                maxWidth: "30rem"
            }
        })

        

        section.appendChild(title)
        container.appendChild(message)
        container.appendChild(img)

        section.appendChild(container)

        return section
    }

    private buildWindowsInstalationSectionPartTwo() : UIComponent{
        const section = new UIComponent({
            type: "div",
            id: "valhalla-view-windows-installation",
            classes: ["box-column","box-center","section"],
            styles: {
                position: "relative",
                width: "100%",
                minHeight: "100%",
                padding:"2rem",
                
            }
        });

        const container = new UIComponent({
            classes : ["box-row", "box-y-center","win-container"]
        })

        const message = new UIComponent({
            type: "p",
            text: App.getBundle().valhalla.WINDOWS_MESSAGE_TWO
            .replace("$1",`<b class="bold">${App.getBundle().valhalla.MORE_INFO}</b>`)
            .replace("$2",`<b class="bold">${App.getBundle().valhalla.EJECUTE_ANYWAY}</b>`)
        })

        const img = new UIComponent({
            type: "img",
            attributes :{
                src : Configurations.PATHS.IMAGES + "win-instalation-warning-2.jpg"
            },
            styles: {
                marginTop: "3rem", 
                maxWidth: "30rem"
            }
        })

   

        container.appendChild(message)
        container.appendChild(img)
        section.appendChild(container)

        return section
    }


}