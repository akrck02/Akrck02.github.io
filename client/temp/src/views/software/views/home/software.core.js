import { Configurations } from "../../../../config/config.js";
export default class SoftwareCore {
    static getTechnologies() {
        const technologies = [];
        for (const name in this.projects) {
            let local = this.projects[name].technologies || [];
            local.forEach(t => {
                if (technologies.indexOf(t.toLowerCase()) == -1) {
                    technologies.push(t.toLowerCase());
                }
            });
        }
        return technologies;
    }
    static getLangs() {
        const langs = [];
        for (const name in this.projects) {
            let local = this.projects[name].langs || [];
            local.forEach(t => {
                if (langs.indexOf(t.toLowerCase()) == -1) {
                    langs.push(t.toLowerCase());
                }
            });
        }
        return langs;
    }
    static getProjectsByCategory(tech) {
        if (tech == "all" || tech == "" || tech == undefined) {
            return this.projects;
        }
        const projectsByCategory = {};
        for (const name in this.projects) {
            let local = this.projects[name].langs || [];
            let localTech = this.projects[name].technologies || [];
            local = local.map(l => l.toLowerCase());
            localTech = localTech.map(l => l.toLowerCase());
            if (local.indexOf(tech.toLocaleLowerCase()) != -1) {
                projectsByCategory[name] = this.projects[name];
            }
            if (localTech.indexOf(tech.toLocaleLowerCase()) != -1) {
                projectsByCategory[name] = this.projects[name];
            }
        }
        return projectsByCategory;
    }
}
SoftwareCore.projects = {
    "Valhalla": {
        technologies: ["Electron", "Nodejs", "SQLite"],
        langs: ["Typescript", "Mariadb", "HTML", "CSS"],
        icon: Configurations.PATHS.ICONS + "valhalla-logo-light.svg",
        url: Configurations.VIEWS.SOFTWARE + "/valhalla",
        github: "akrck02/valhalla"
    },
    "GTD Framework": {
        technologies: [],
        langs: ["Typescript"],
        github: "akrck02/GTD-Framework",
        icon: Configurations.PATHS.ICONS + "gtdf-logo.svg",
    },
    "GTD-LIB-TS": {
        technologies: [],
        langs: ["Typescript"],
        github: "akrck02/GTD-LIB-TS",
        icon: Configurations.PATHS.ICONS + "gtd-logo.svg",
    },
    "GTDF-CLI": {
        technologies: [],
        langs: ["Go"],
        github: "akrck02/GTDF-CLI",
        icon: Configurations.PATHS.ICONS + "gtdf-cli-logo.svg",
    },
    "Bubble-UI": {
        technologies: [],
        langs: ["CSS"],
        github: "akrck02/Bubble-UI",
        icon: Configurations.PATHS.ICONS + "BubbleUI-logo.svg",
    },
    "Github backup script": {
        technologies: ["nodejs"],
        langs: ["Typescript"],
        github: "akrck02/Github-backup-script",
        icon: Configurations.PATHS.ICONS + "gh-backup-script-logo.svg",
    },
    "moonbot": {
        techologies: ["nodejs", "discordjs"],
        langs: ["Typescript"],
        github: "akrck02/moonbot",
        icon: Configurations.PATHS.ICONS + "moonbot-logo.svg",
    },
};
