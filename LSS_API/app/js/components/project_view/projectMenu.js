import { get_projects } from "../../connectors/projects.js";
import { create } from "../../lib/component.js";
import { projects_menu_entry } from "./projectsMenuEntry.js";

export const projects_menu = (properties) => {
    
    const main = (properties.main != undefined) ? properties.main : create({});

    let user = localStorage.getItem("Lssmk:usr") 
    let new_project = create({
        type : 'button',
        text : 'New project',
        classes : ['new_project_button','framed_btn','bold']
    });
    new_project.appendTo(main.element);

    get_projects((json)=>{
        if(json.success){
            const content = json.content;
            const menu = create({
               type: 'menu', 
               styles : {
                height : 'auto',
                width : '100%',
                display : 'block',
                margin : 0,
                padding: 0
               }
            });
            for (const key in content) {
                projects_menu_entry({
                   project  : content[key].name,
                   id       : content[key].id
               }).appendTo(menu.element);
            }

            if(content[0] == undefined) menu.element.innerHTML = "<p class='h1 center_text' style='font-size: 1.2em; color : #c5c5c5'>No tienes proyectos todavia, prueba a crear uno :)</p>";
            menu.appendTo(main.element);
        }
    },user);
}
