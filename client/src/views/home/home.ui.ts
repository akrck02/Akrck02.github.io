import { App } from "../../app.js";
import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
import { getSocialIcon } from "../../lib/social.js";
import { getTechIcon } from "../../lib/tech.js";
import SoftwareCore from "../software/views/home/software.core.js";

export default class HomeView extends UIComponent {
   
    static technologies = [
        "TypeScript",
        "Java",
        "Docker",
        "MariaDb",
        "Electron",
        
        "Html",
        "CSS",
        "JavaScript",
        
        "NodeJS",
        "Unity",
        "C#",
       
        "Go",   
        "Python",
        "Sqlite",
    ];


    public constructor() {
        super({
            type : "view",
            id : "home-view",
            classes: ["box-column"],
            styles : {
                padding: "1rem",
                height: "100%",
                width: "100%",
                paddingLeft: "calc(4rem + 7rem)",
                paddingRight: "calc(10rem)",
                paddingTop: "6rem",
                fontFamily: "Inter",
                overflowY : "auto",
                opacity : "0",
                transition : "opacity var(--slow)",
            }
        });
    }

    public show(params : string[], container : UIComponent): void {

        const presentation = this.buildPresentationSection();
        const tecnologies = this.buildTechnologiesSection();

        this.appendChild(presentation);
        this.appendChild(tecnologies);
        this.appendTo(container);

        setTimeout(() => this.element.style.opacity = "1", 40);
        
    }

    private buildPresentationSection() : UIComponent {
        const section = new UIComponent({
            classes: ["box-x-between", "box-row"],
            id: "presentation",
            styles: {
                width: "100%",
            }
        });

        const textColumn = new UIComponent({
            classes: ["box-column"],
        });

        const title = new UIComponent({
            type: "h1",
            text: "Akrck02",
            styles: {
                fontSize: "2rem",
                fontWeight: "900",
                fontFamily: "Inter",
                color: "#fff",
            }
        });

        const greeting = new UIComponent({
            type: "p",
            text: `${App.getBundle().home.HI_THERE_IM_AKRCK02} ????`,
            styles: {
                marginTop: "0.5rem",
            }
        });

        const description = new UIComponent({
            type: "p",
            text: App.getBundle().home.DESCRIPTION_1,
            styles: {
                marginTop: "1.5rem",
                fontSize: "1.2rem",
                maxWidth: "25rem",
            }
        });

        const description2 = new UIComponent({
            type: "p",
            text: App.getBundle().home.DESCRIPTION_2,
            styles: {
                marginTop: "1.5rem",
                fontSize: "1.2rem",
                maxWidth: "25rem",
            }
        });

        const currently = new UIComponent({
            type: "h1",
            text: `${App.getBundle().home.CURRENTLY_WORKING_ON}...`,
            styles: {
                marginTop: "2rem",
                fontSize: "1.7rem",
                fontWeight: "900",
                fontFamily: "'Inter'",
            }
        });

        const projectOne = new UIComponent({
            type: "a",
            classes: ["box-row", "box-x-between", "box-x-center"],
            styles: {
                marginTop: "1.5rem",
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.35rem",
                padding: "0.5rem 1.5rem",
                color: "#fff",
                cursor: "pointer"
            },
            attributes : {
                href: Configurations.VIEWS.SOFTWARE + "/valhalla"
            }
        });

        const projectOneTitle = new UIComponent({
            type: "h2",
            text: "Valhalla",
            classes: ["box-column", "box-x-center"],
            styles: {
                fontSize: "1.2rem", 
                fontWeight: "900",
            }
        });

        const projectOneLogo = new UIComponent({
            type: "img",
            attributes: {
                src: `${Configurations.PATHS.ICONS}/valhalla-logo-light.svg`,
            },
            styles: {
                width: "3rem",
                height: "3rem",
            }
        });


        const projectTwo = new UIComponent({
            type: "a",
            classes: ["box-row", "box-x-between", "box-x-center"],
            styles: {
                marginTop: ".5rem",
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.35rem",
                padding: "0.5rem 1.5rem",
                color: "#fff",
                cursor: "pointer"
            },
            attributes : {
                href: "https://github.com/Nightlight-studios/io-world",
                target: "_blank"
            }
        });

        const projectTwoTitle = new UIComponent({
            type: "h2",
            text: "IO World",
            classes: ["box-column", "box-x-center"],
            styles: {
                fontSize: "1.2rem", 
                fontWeight: "900",
            }
        });

        const projectTwoLogo = new UIComponent({
            type: "img",
            attributes: {
                src: `${Configurations.PATHS.ICONS}/io-logo.svg`,
            },
            styles: {
                width: "3rem",
                height: "3rem",
            }
        });

        projectOne.appendChild(projectOneTitle);
        projectOne.appendChild(projectOneLogo);

        projectTwo.appendChild(projectTwoTitle);
        projectTwo.appendChild(projectTwoLogo);

        textColumn.appendChild(title);
        textColumn.appendChild(greeting);
        textColumn.appendChild(description);
        textColumn.appendChild(description2);
        textColumn.appendChild(currently);
        textColumn.appendChild(projectOne);
        textColumn.appendChild(projectTwo);

        const profileColumn = new UIComponent({
            classes: ["box-column", "box-y-center"],
        });

        const profilePicture = new UIComponent({
            type: "img",
            id: "profile-pic",
            attributes: {
                src: `${Configurations.PATHS.IMAGES}/me.jpg`,
            },
            styles: {
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "0rem",
            }
        });

        const companyCard = new UIComponent({
            classes: ["box-row", "box-x-start", "box-y-center"],
            styles: {
                width: "15rem",
                height: "3rem",
                marginTop: "2rem",
            }
        });

        const companyIcon = getMaterialIcon("business", {
            size: "1.5rem",
            fill: "#fff",
        });

        const companyName = new UIComponent({
            type: "a",
            text: "Nightlight studios ???",
            styles: {
                fontSize: "1.2rem",
                marginLeft: "1.25rem",
                color: "#fff",
                cursor: "pointer"
            },
            attributes : {
                href : "https://github.com/Nightlight-studios",
                target : "_blank"
            }
        });

        companyCard.appendChild(companyIcon);
        companyCard.appendChild(companyName);


        const githubCard = new UIComponent({
            classes: ["box-row", "box-x-start", "box-y-center"],
            styles: {
                width: "15rem",
                height: "3rem",
                marginTop: "-.5rem",
            }
        });

        const githubIcon = getSocialIcon("github", {
            size: "1.5rem",
            fill: "#fff",
        });

        const githubName = new UIComponent({
            type: "a",
            text: "akrck02",
            styles: {
                fontSize: "1.2rem",
                marginLeft: "1.25rem",
                color: "#fff",
                cursor: "pointer"
            },
            attributes : {
                href: "https://github.com/akrck02",
                target : "_blank"
            }
        });

        githubCard.appendChild(githubIcon);
        githubCard.appendChild(githubName);

        profileColumn.appendChild(profilePicture);
        profileColumn.appendChild(companyCard);
        profileColumn.appendChild(githubCard);

        section.appendChild(textColumn);
        section.appendChild(profileColumn);

        return section;
    }

    private buildTechnologiesSection(): UIComponent {
        const section = new UIComponent({
            classes: ["box-column"],
            styles: {
                width: "100%",
                marginTop: "2rem",
            }
        });


        const title = new UIComponent({
            type: "h1",
            text: App.getBundle().home.TECHNOLOGIES_IVE_USED,
            styles: {
                marginTop: "2rem",
            }
        });

        const techContainer = new UIComponent({
            classes: ["box-row", "box-x-start", "box-y-center", "box-warp"],
            styles: {
                marginTop: "1.5rem",
                width: "100%",
            }
        });


        SoftwareCore.getLangs().forEach(tech => {
            techContainer.appendChild(this.techCard(tech));
        });

        SoftwareCore.getTechnologies().forEach(tech => {
            techContainer.appendChild(this.techCard(tech));
        });



        section.appendChild(title);
        section.appendChild(techContainer);
        return section;
    }


    private techCard(name: string): UIComponent {
        
        const size = 4;
        const card = new UIComponent({
            type: "a",
            classes: ["box-row", "box-center"],
            styles: {
                minWidth: size + "rem",
                minHeight: size + "rem",
                maxWidth: size + "rem",
                maxHeight: size + "rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                marginRight: ".5rem",
                marginTop: ".5rem",
                filter: "grayscale(0%)",
            },
            attributes: {
                title: name,
                href: `${Configurations.VIEWS.SOFTWARE}/search/${name}`,
            }
        });

        const icon = getTechIcon(name.toLowerCase(), {
            fill : "#fff",
            size: size * .55 + "rem"
        })
        
        card.appendChild(icon);


        return card;
    }
}