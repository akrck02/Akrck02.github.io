import { Configurations } from "../../config/config.js";
import { getMaterialIcon } from "../../lib/gtd-ts/material/materialicons.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
import { getSocialIcon } from "../../lib/social.js";
export default class HomeView extends UIComponent {
    constructor() {
        super({
            type: "view",
            id: "home",
            classes: ["box-column"],
            styles: {
                padding: "1rem",
                height: "100%",
                width: "100%",
                paddingLeft: "calc(4rem + 7rem)",
                paddingRight: "calc(10rem)",
                paddingTop: "6rem",
                backgroundColor: "#151515",
                backgroundImage: `url(${Configurations.PATHS.WALLPAPERS}/wallpaper.png)`,
                backgroundSize: "cover",
                fontFamily: "Inter",
            }
        });
    }
    show(params, container) {
        const presentation = this.buildPresentationSection();
        const tecnologies = this.buildTechnologiesSection();
        this.appendChild(presentation);
        this.appendChild(tecnologies);
        this.appendTo(container);
    }
    buildPresentationSection() {
        const section = new UIComponent({
            classes: ["box-x-between", "box-row"],
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
            text: `Hi there!, I’m akrck02. 👋`,
            styles: {
                marginTop: "0.5rem",
            }
        });
        const description = new UIComponent({
            type: "p",
            text: `I’m a 21 year old software developer.  I like puzzles, video games and software architecture.`,
            styles: {
                marginTop: "1.5rem",
                fontSize: "1.2rem",
                width: "25rem",
            }
        });
        const description2 = new UIComponent({
            type: "p",
            text: `From time to time I create projects to make development easier or solve problems.`,
            styles: {
                marginTop: "1.5rem",
                fontSize: "1.2rem",
                width: "25rem",
            }
        });
        const currently = new UIComponent({
            type: "h1",
            text: "Currently working on...",
            styles: {
                marginTop: "2rem",
                fontSize: "1.7rem",
                fontWeight: "900",
                fontFamily: "Inter",
            }
        });
        const projectOne = new UIComponent({
            type: "div",
            classes: ["box-row", "box-x-between", "box-x-center"],
            styles: {
                marginTop: "1.5rem",
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.35rem",
                padding: "0.5rem 1.5rem",
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
            type: "div",
            classes: ["box-row", "box-x-between", "box-x-center"],
            styles: {
                marginTop: ".5rem",
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.35rem",
                padding: "0.5rem 1.5rem",
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
            type: "p",
            text: "Nightlight studios ™",
            styles: {
                fontSize: "1.2rem",
                marginLeft: "1.25rem",
            }
        });
        companyCard.appendChild(companyIcon);
        companyCard.appendChild(companyName);
        const githubCard = new UIComponent({
            classes: ["box-row", "box-x-start", "box-y-center"],
            styles: {
                width: "15rem",
                height: "3rem",
                marginTop: ".1rem",
            }
        });
        const githubIcon = getSocialIcon("github", {
            size: "1.5rem",
            fill: "#fff",
        });
        const githubName = new UIComponent({
            type: "p",
            text: "akrck02",
            styles: {
                fontSize: "1.2rem",
                marginLeft: "1.25rem",
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
    buildTechnologiesSection() {
        const section = new UIComponent({
            classes: ["box-column"],
            styles: {
                width: "100%",
                marginTop: "2rem",
            }
        });
        const title = new UIComponent({
            type: "h1",
            text: "Technologies I’ve used",
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
        HomeView.technologies.forEach(tech => {
            techContainer.appendChild(this.techCard(tech));
        });
        section.appendChild(title);
        section.appendChild(techContainer);
        return section;
    }
    techCard(name) {
        const card = new UIComponent({
            classes: ["box-row", "box-center"],
            styles: {
                minWidth: "7rem",
                minHeight: "7rem",
                maxWidth: "7rem",
                maxHeight: "7rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                marginRight: ".5rem",
                marginTop: ".5rem",
                filter: "grayscale(0%)",
            },
            attributes: {
                title: name,
            }
        });
        const icon = new UIComponent({
            type: "img",
            attributes: {
                src: `${Configurations.PATHS.ICONS}/${name.toLowerCase()}.svg`,
            },
            styles: {
                width: "3.5rem",
                height: "3.5rem",
            }
        });
        card.appendChild(icon);
        return card;
    }
}
HomeView.technologies = [
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
    "Csharp",
    "Go",
    "Python",
    "Sqlite",
];
