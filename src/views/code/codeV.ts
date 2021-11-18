import { getNavbar } from "../../components/navbar.js";
import { CONFIG, GITHUB, PATHS } from "../../config/config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { getUserRepos } from "../../services/github.js";
import { ProjectCard } from "./components/projectCard.js";

export default function codeV(params :  string[]) : void {

    const title = CONFIG.APP_NAME + " - Code";
    document.title = title;

    const view = new UIComponent({
        type : "view",
        styles : {
            position : "relative",
            display : "flex",
            flexDirection: "column",
            width : "100%",
            height : "100%", 
            alignItems: "center",
            transition: ".25s",
            opacity: "0",
            background: "#fff",
            overflow: "hidden"
        }
    });

    const navbar = getNavbar();
    navbar.select(1);
    navbar.show(view);

    const content = new UIComponent({
        type : "div",
        styles : {
            display : "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width : "100%",
            height : "100%",
            justifyContent: "space-evenly",
            padding: "0px 15%",
            overflow: "auto"
        }
    });

    getUserRepos((repos) => {
        try{        
            repos.forEach((repo) => {
                const card = new ProjectCard(repo.name, repo.description, PATHS.GITHUB_IMAGES + repo.id +".png", repo.html_url, repo.id);
                card.appendTo(content);
                setTimeout(() => card.show(), 250);
            });
        }catch(err){
            const message = new UIComponent({
                type : "div",
                styles : {
                    margin: "20px",
                    padding: "15px",
                    color: "#f1f1f1",
                    borderRadius: "5px",
                    height: "50px",
                    background: "var(--error_color)",
                },
                text : "Ups, We're having some problems to find the projects :("
            });
            message.appendTo(content);
        }
    });

    content.appendTo(view);
    view.appendTo(document.body);

    setTimeout(() => {
        view.element.style.opacity = "1";
    }, 200);
}